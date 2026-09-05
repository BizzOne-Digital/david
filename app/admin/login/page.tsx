"use client";

import { Suspense, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { loginAction } from "@/actions/auth";
import type { ActionResult } from "@/actions/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    loginAction,
    null
  );

  useEffect(() => {
    if (state?.success) {
      router.push(callbackUrl);
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router, callbackUrl]);

  return (
    <Card className="w-full max-w-md border-white/10 bg-gunmetal">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gradient">Admin Portal</CardTitle>
        <CardDescription>Sign in to manage Rethink Automotive</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@rethinkautomotive.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/admin/forgot-password"
            className="text-sm text-electric hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<div className="text-silver">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
