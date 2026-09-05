"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { forgotPasswordAction } from "@/actions/auth";
import type { ActionResult } from "@/actions/auth";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    forgotPasswordAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("If an account exists, a reset link has been sent.");
    } else if (state && !state.success) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-white/10 bg-gunmetal">
        <CardHeader className="text-center">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/admin/login" className="text-sm text-electric hover:underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
