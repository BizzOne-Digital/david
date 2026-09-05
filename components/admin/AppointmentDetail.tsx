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
import { updateAppointmentAction } from "@/actions/appointments";
import { formatDateTime } from "@/lib/utils";
import type { AppointmentStatus } from "@/types";

interface AppointmentDetailProps {
  appointment: {
    _id: string;
    name: string;
    dealershipName: string;
    workEmail: string;
    phone: string;
    website?: string;
    numberOfLocations?: number;
    interestedIn?: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    message?: string;
    status: AppointmentStatus;
    internalNotes?: string;
    createdAt: string;
  };
}

export function AppointmentDetail({ appointment }: AppointmentDetailProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateAppointmentAction(appointment._id, {
        status: formData.get("status") as AppointmentStatus,
        internalNotes: String(formData.get("internalNotes") ?? ""),
      });
      if (result.success) toast.success("Appointment updated");
      else toast.error(result.error);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/appointments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-white">{appointment.name}</h2>
          <p className="text-sm text-silver">{appointment.dealershipName}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-silver">Email:</span> {appointment.workEmail}</p>
            <p><span className="text-silver">Phone:</span> {appointment.phone}</p>
            {appointment.website && (
              <p><span className="text-silver">Website:</span> {appointment.website}</p>
            )}
            {appointment.numberOfLocations && (
              <p><span className="text-silver">Locations:</span> {appointment.numberOfLocations}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Appointment Details</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><span className="text-silver">Date:</span> {formatDateTime(appointment.preferredDate)}</p>
            <p><span className="text-silver">Time:</span> {appointment.preferredTime}</p>
            <p><span className="text-silver">Timezone:</span> {appointment.timezone}</p>
            {appointment.interestedIn && (
              <p><span className="text-silver">Interested In:</span> {appointment.interestedIn}</p>
            )}
            <p><span className="text-silver">Submitted:</span> {formatDateTime(appointment.createdAt)}</p>
          </CardContent>
        </Card>
      </div>

      {appointment.message && (
        <Card>
          <CardHeader><CardTitle>Message</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{appointment.message}</p></CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
        <CardContent>
          <form action={handleUpdate} className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select id="status" name="status" defaultValue={appointment.status}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                name="internalNotes"
                defaultValue={appointment.internalNotes}
                rows={4}
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
