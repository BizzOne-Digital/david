"use client";

import { Suspense, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { resetPasswordAction } from "@/actions/auth";
import type { ActionResult } from "@/actions/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    resetPasswordAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Password updated successfully.");
      router.push("/admin/login");
    } else if (state && !state.success) {
      toast.error(state.error);
    }
  }, [state, router]);

  if (!token) {
    return (
      <Card className="w-full max-w-md border-white/10 bg-gunmetal">
        <CardContent className="pt-6 text-center">
          <p className="text-silver">Invalid or missing reset token.</p>
          <Link href="/admin/forgot-password" className="mt-4 inline-block text-electric hover:underline">
            Request a new link
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-white/10 bg-gunmetal">
      <CardHeader className="text-center">
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="token" value={token} />
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input id="password" name="password" type="password" required minLength={8} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<div className="text-silver">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
