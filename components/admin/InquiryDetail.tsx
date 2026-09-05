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
import { updateInquiryAction } from "@/actions/inquiries";
import { formatDateTime } from "@/lib/utils";
import type { InquiryStatus } from "@/types";

interface InquiryDetailProps {
  inquiry: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    dealership?: string;
    inquiryType: string;
    productInterest?: string;
    message: string;
    status: InquiryStatus;
    internalNotes?: string;
    createdAt: string;
  };
}

export function InquiryDetail({ inquiry }: InquiryDetailProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateInquiryAction(inquiry._id, {
        status: formData.get("status") as InquiryStatus,
        internalNotes: String(formData.get("internalNotes") ?? ""),
      });
      if (result.success) toast.success("Inquiry updated");
      else toast.error(result.error);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/inquiries">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">{inquiry.name}</h2>
          <p className="text-sm text-silver">{inquiry.inquiryType}</p>
        </div>
        <StatusBadge status={inquiry.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-silver">Email:</span> {inquiry.email}</p>
            {inquiry.phone && <p><span className="text-silver">Phone:</span> {inquiry.phone}</p>}
            {inquiry.dealership && <p><span className="text-silver">Dealership:</span> {inquiry.dealership}</p>}
            {inquiry.productInterest && (
              <p><span className="text-silver">Product Interest:</span> {inquiry.productInterest}</p>
            )}
            <p><span className="text-silver">Submitted:</span> {formatDateTime(inquiry.createdAt)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Message</CardTitle></CardHeader>
          <CardContent><p className="text-sm whitespace-pre-wrap">{inquiry.message}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
        <CardContent>
          <form action={handleUpdate} className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={inquiry.status}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                name="internalNotes"
                defaultValue={inquiry.internalNotes}
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Inquiry"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
