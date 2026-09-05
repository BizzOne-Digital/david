"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  Package,
  ShoppingCart,
  Calendar,
  MessageSquare,
  DollarSign,
  Tag,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils/money";
import { formatDateTime } from "@/lib/utils";
import type { DashboardStats } from "@/types";

interface DashboardPageProps {
  stats: DashboardStats;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    customerName: string;
    totalCents: number;
    status: string;
    createdAt: string;
  }>;
  revenueData: Array<{ month: string; revenue: number; orders: number }>;
}

export function DashboardClient({
  stats,
  recentOrders,
  revenueData,
}: DashboardPageProps) {
  const orderColumns = [
    {
      key: "orderNumber",
      header: "Order #",
      cell: (row: (typeof recentOrders)[0]) => (
        <span className="font-mono text-sm">{row.orderNumber}</span>
      ),
      sortable: true,
    },
    {
      key: "customerName",
      header: "Customer",
      cell: (row: (typeof recentOrders)[0]) => row.customerName,
      sortable: true,
    },
    {
      key: "totalCents",
      header: "Total",
      cell: (row: (typeof recentOrders)[0]) => formatMoney(row.totalCents),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: (typeof recentOrders)[0]) => (
        <StatusBadge status={row.status as "new"} />
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      cell: (row: (typeof recentOrders)[0]) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          description={`${stats.activeProducts} active · ${stats.productsOnSale} on sale`}
          icon={Package}
        />
        <StatCard
          title="Orders"
          value={stats.totalOrders}
          description={`${stats.newOrders} new orders`}
          icon={ShoppingCart}
        />
        <StatCard
          title="Revenue"
          value={formatMoney(stats.revenueCents)}
          description="Paid orders total"
          icon={DollarSign}
        />
        <StatCard
          title="Appointments"
          value={stats.totalAppointments}
          description={`${stats.pendingAppointments} pending`}
          icon={Calendar}
        />
        <StatCard
          title="Inquiries"
          value={stats.totalInquiries}
          icon={MessageSquare}
        />
        <StatCard
          title="Active Coupons"
          value={stats.activeCoupons}
          icon={Tag}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e1e28",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-silver">
                  No revenue data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e1e28",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-silver">
                  No order data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={recentOrders}
            columns={orderColumns}
            searchKeys={["orderNumber", "customerName"]}
            searchable={recentOrders.length > 0}
            emptyMessage="No orders yet."
          />
        </CardContent>
      </Card>
    </div>
  );
}
