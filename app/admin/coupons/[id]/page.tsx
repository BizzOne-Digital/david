import { notFound } from "next/navigation";
import { getCouponByIdAction } from "@/actions/coupons";
import { CouponForm } from "@/components/admin/CouponForm";

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getCouponByIdAction(id);
  if (!result.success || !result.data) notFound();
  return <CouponForm coupon={result.data as Parameters<typeof CouponForm>[0]["coupon"]} />;
}
