"use server";

import connectDB from "@/lib/db/connect";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Appointment from "@/models/Appointment";
import ContactInquiry from "@/models/ContactInquiry";
import Coupon from "@/models/Coupon";
import type { DashboardStats } from "@/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await connectDB();

    const [
      totalProducts,
      activeProducts,
      productsOnSale,
      totalOrders,
      newOrders,
      revenueResult,
      totalAppointments,
      pendingAppointments,
      totalInquiries,
      activeCoupons,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ onSale: true, isActive: true }),
      Order.countDocuments(),
      Order.countDocuments({ status: "new" }),
      Order.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalCents" } } },
      ]),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      ContactInquiry.countDocuments(),
      Coupon.countDocuments({ isActive: true }),
    ]);

    return {
      totalProducts,
      activeProducts,
      productsOnSale,
      totalOrders,
      newOrders,
      revenueCents: revenueResult[0]?.total ?? 0,
      totalAppointments,
      pendingAppointments,
      totalInquiries,
      activeCoupons,
    };
  } catch {
    return {
      totalProducts: 0,
      activeProducts: 0,
      productsOnSale: 0,
      totalOrders: 0,
      newOrders: 0,
      revenueCents: 0,
      totalAppointments: 0,
      pendingAppointments: 0,
      totalInquiries: 0,
      activeCoupons: 0,
    };
  }
}

export async function getRecentOrders(limit = 5) {
  try {
    await connectDB();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return JSON.parse(JSON.stringify(orders));
  } catch {
    return [];
  }
}

export async function getRevenueChartData() {
  try {
    await connectDB();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const data = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalCents" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return data.map(
      (d: { _id: { year: number; month: number }; revenue: number; orders: number }) => ({
        month: `${d._id.year}-${String(d._id.month).padStart(2, "0")}`,
        revenue: d.revenue / 100,
        orders: d.orders,
      })
    );
  } catch {
    return [];
  }
}
