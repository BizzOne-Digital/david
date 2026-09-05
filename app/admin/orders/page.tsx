import { getOrdersAdminAction } from "@/actions/orders";
import { OrdersTable } from "@/components/admin/OrdersTable";

export default async function OrdersPage() {
  const result = await getOrdersAdminAction();
  const orders = result.success ? (result.data ?? []) : [];
  return <OrdersTable orders={orders as Parameters<typeof OrdersTable>[0]["orders"]} />;
}
