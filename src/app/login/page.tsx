"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, googleAuthErrorMessage } from "@/lib/auth-client";

const fieldClassName =
  "h-11 border-input bg-background text-foreground placeholder:text-muted-foreground";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(
          error.message || "Invalid email or password. Please try again."
        );
        return;
      }

      toast.success("Welcome back! You are logged in.");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("login request failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGooglePending(true);
    try {
      const { error: googleError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/login",
      });
      if (googleError) {
        toast.error(googleAuthErrorMessage(googleError.message));
      }
    } catch (err) {
      console.error("google sign-in failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setGooglePending(false);
    }
  };

  const busy = submitting || googlePending;

  return (
    <div className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden bg-background px-6 py-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(245,158,11,0.30), rgba(180,83,9,0.16) 45%, rgba(10,10,10,0) 72%)",
        }}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleLogin();
          }}
          className="mt-8 space-y-5"
        >
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-[13px] font-normal text-muted-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="text-[13px] font-normal text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
            />
            <div className="text-right">
              <a
                href="#"
                className="text-xs font-medium text-amber-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="h-11 w-full bg-amber-400 text-black hover:bg-amber-300"
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            onClick={() => void handleGoogleLogin()}
            disabled={busy}
            className="h-11 w-full bg-foreground text-background hover:bg-foreground/90"
          >
            {googlePending ? "Redirecting to Google..." : "Continue with Google"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to StudioSpace?{" "}
          <Link
            href="/register"
            className="font-medium text-amber-500 hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-4 rounded-lg border border-border bg-muted px-4 py-3 text-center text-xs text-muted-foreground">
          Examiner demo: demo@studiospace.com / Demo123
        </div>
      </div>
    </div>
  );
}
