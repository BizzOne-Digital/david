import { getCouponsAdminAction } from "@/actions/coupons";
import { CouponsTable } from "@/components/admin/CouponsTable";

export default async function CouponsPage() {
  const result = await getCouponsAdminAction();
  const coupons = result.success ? (result.data ?? []) : [];
  return <CouponsTable coupons={coupons as Parameters<typeof CouponsTable>[0]["coupons"]} />;
}
