export function centsToDollars(cents: number): number {
  return cents / 100;
}

export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function formatMoney(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(centsToDollars(cents));
}

export function calculatePercentageDiscount(
  priceCents: number,
  percentage: number
): number {
  return Math.round(priceCents * (percentage / 100));
}

export function calculateSalePrice(
  priceCents: number,
  discountType: "percentage" | "fixed" | "custom_price",
  discountValue: number
): number {
  switch (discountType) {
    case "percentage":
      return priceCents - calculatePercentageDiscount(priceCents, discountValue);
    case "fixed":
      return Math.max(0, priceCents - discountValue);
    case "custom_price":
      return discountValue;
    default:
      return priceCents;
  }
}

export function isSaleActive(
  onSale: boolean,
  saleStartDate?: Date | null,
  saleEndDate?: Date | null
): boolean {
  if (!onSale) return false;
  const now = new Date();
  if (saleStartDate && now < new Date(saleStartDate)) return false;
  if (saleEndDate && now > new Date(saleEndDate)) return false;
  return true;
}

export function getDiscountPercentage(
  originalCents: number,
  saleCents: number
): number {
  if (originalCents <= 0) return 0;
  return Math.round(((originalCents - saleCents) / originalCents) * 100);
}

export interface OrderTotals {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
}

export function calculateOrderTotals(
  items: { unitPriceCents: number; quantity: number }[],
  taxRate: number,
  couponDiscountCents = 0
): OrderTotals {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unitPriceCents * item.quantity,
    0
  );
  const discountCents = Math.min(couponDiscountCents, subtotalCents);
  const taxableCents = subtotalCents - discountCents;
  const taxCents = Math.round(taxableCents * taxRate);
  const totalCents = taxableCents + taxCents;
  return { subtotalCents, discountCents, taxCents, totalCents };
}
