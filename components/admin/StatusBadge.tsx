import { Badge } from "@/components/ui/badge";
import type {
  OrderStatus,
  PaymentStatus,
  AppointmentStatus,
  InquiryStatus,
} from "@/types";

type StatusType =
  | OrderStatus
  | PaymentStatus
  | AppointmentStatus
  | InquiryStatus
  | "active"
  | "inactive"
  | "public"
  | "private";

const statusConfig: Record<
  StatusType,
  { label: string; variant: "default" | "secondary" | "destructive" | "success" | "warning" | "outline" }
> = {
  new: { label: "New", variant: "default" },
  pending: { label: "Pending", variant: "warning" },
  awaiting_payment: { label: "Awaiting Payment", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  processing: { label: "Processing", variant: "default" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  refunded: { label: "Refunded", variant: "secondary" },
  not_required: { label: "Not Required", variant: "secondary" },
  unpaid: { label: "Unpaid", variant: "warning" },
  failed: { label: "Failed", variant: "destructive" },
  confirmed: { label: "Confirmed", variant: "success" },
  rescheduled: { label: "Rescheduled", variant: "warning" },
  contacted: { label: "Contacted", variant: "default" },
  qualified: { label: "Qualified", variant: "success" },
  converted: { label: "Converted", variant: "success" },
  closed: { label: "Closed", variant: "secondary" },
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "secondary" },
  public: { label: "Public", variant: "default" },
  private: { label: "Private", variant: "outline" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status.replace(/_/g, " "),
    variant: "outline" as const,
  };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
