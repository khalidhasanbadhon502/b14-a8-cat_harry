"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, XIcon } from "lucide-react";
import { authClient, googleAuthErrorMessage } from "@/lib/auth-client";

const fieldClassName =
  "h-11 border-input bg-background text-foreground placeholder:text-muted-foreground";

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  const rules = [
    { label: "Has an uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Has a lowercase letter", passed: /[a-z]/.test(password) },
    { label: "At least 6 characters", passed: password.length >= 6 },
  ];

  const handleRegister = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name) {
      toast.error("Name is required");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created! Welcome to StudioSpace.");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("register request failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setGooglePending(true);
    try {
      const { error: googleError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/register",
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
            "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(245,158,11,0.30), rgba(180,83,9,0.16) 45%, rgba(10,10,10,0) 72%)",
        }}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-foreground">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join as a creator, a host, or both.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleRegister(event.currentTarget);
          }}
          className="mt-8 space-y-5"
        >
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-[13px] font-normal text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              required
              className={fieldClassName}
            />
          </div>

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
              placeholder="••••••"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
            />
            <ul className="mt-1 space-y-1.5">
              {rules.map((rule) => (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 text-xs font-medium ${
                    rule.passed ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {rule.passed ? (
                    <CheckIcon className="size-3.5" />
                  ) : (
                    <XIcon className="size-3.5" />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="h-11 w-full bg-amber-400 text-black hover:bg-amber-300"
          >
            {submitting ? "Registering..." : "Register"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            onClick={() => void handleGoogleRegister()}
            disabled={busy}
            className="h-11 w-full bg-foreground text-background hover:bg-foreground/90"
          >
            {googlePending ? "Redirecting to Google..." : "Continue with Google"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
