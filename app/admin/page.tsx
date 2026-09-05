import {
  getDashboardStats,
  getRecentOrders,
  getRevenueChartData,
} from "@/actions/dashboard";
import { DashboardClient } from "@/components/admin/DashboardClient";

export default async function AdminDashboardPage() {
  const [stats, recentOrders, revenueData] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
    getRevenueChartData(),
  ]);

  return (
    <DashboardClient
      stats={stats}
      recentOrders={recentOrders}
      revenueData={revenueData}
    />
  );
}
