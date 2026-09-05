"use client";

import { useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateOrderAction } from "@/actions/orders";
import { formatMoney } from "@/lib/utils/money";
import { formatDateTime } from "@/lib/utils";
import type { OrderStatus, PaymentStatus } from "@/types";

interface OrderDetailProps {
  order: {
    _id: string;
    orderNumber: string;
    customerName: string;
    dealership: string;
    email: string;
    phone: string;
    billingAddress?: string;
    items: Array<{
      productName: string;
      quantity: number;
      unitPriceCents: number;
      totalPriceCents: number;
    }>;
    subtotalCents: number;
    discountCents: number;
    taxCents: number;
    totalCents: number;
    couponCode?: string;
    orderNotes?: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    internalNotes?: string;
    createdAt: string;
  };
}

export function OrderDetail({ order }: OrderDetailProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateOrderAction(order._id, {
        status: formData.get("status") as OrderStatus,
        paymentStatus: formData.get("paymentStatus") as PaymentStatus,
        internalNotes: String(formData.get("internalNotes") ?? ""),
      });
      if (result.success) toast.success("Order updated");
      else toast.error(result.error);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">{order.orderNumber}</h2>
          <p className="text-sm text-silver">{formatDateTime(order.createdAt)}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-silver">Name:</span> {order.customerName}</p>
            <p><span className="text-silver">Dealership:</span> {order.dealership}</p>
            <p><span className="text-silver">Email:</span> {order.email}</p>
            <p><span className="text-silver">Phone:</span> {order.phone}</p>
            {order.billingAddress && (
              <p><span className="text-silver">Billing:</span> {order.billingAddress}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-silver">Subtotal:</span> {formatMoney(order.subtotalCents)}</p>
            <p><span className="text-silver">Discount:</span> {formatMoney(order.discountCents)}</p>
            <p><span className="text-silver">Tax:</span> {formatMoney(order.taxCents)}</p>
            <p className="text-lg font-semibold">
              Total: {formatMoney(order.totalCents)}
            </p>
            {order.couponCode && (
              <p><span className="text-silver">Coupon:</span> {order.couponCode}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/10 p-3"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-xs text-silver">Qty: {item.quantity}</p>
                </div>
                <p>{formatMoney(item.totalPriceCents)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleUpdate} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Order Status</Label>
              <Select id="status" name="status" defaultValue={order.status}>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="awaiting_payment">Awaiting Payment</option>
                <option value="paid">Paid</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select id="paymentStatus" name="paymentStatus" defaultValue={order.paymentStatus}>
                <option value="not_required">Not Required</option>
                <option value="unpaid">Unpaid</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                name="internalNotes"
                defaultValue={order.internalNotes}
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
