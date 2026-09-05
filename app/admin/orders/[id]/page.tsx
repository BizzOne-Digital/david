import { notFound } from "next/navigation";
import { getOrderByIdAction } from "@/actions/orders";
import { OrderDetail } from "@/components/admin/OrderDetail";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getOrderByIdAction(id);
  if (!result.success || !result.data) notFound();
  return <OrderDetail order={result.data as Parameters<typeof OrderDetail>[0]["order"]} />;
}
