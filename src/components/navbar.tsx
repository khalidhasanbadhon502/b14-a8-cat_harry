"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Laptop, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const accountLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Add New Studio", href: "/add-studio" },
  { label: "My Studio Listings", href: "/my-listings" },
  { label: "My Bookings", href: "/my-bookings" },
];

type NavbarProps = {
  avatar?: boolean;
};

export function Navbar({ avatar }: NavbarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  const loggedIn = Boolean(session?.user);
  const showAvatar = avatar ?? loggedIn;

  const displayName = session?.user?.name || "Account";
  const displayEmail = session?.user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut();
      toast.success("Signed out successfully.");
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("sign out failed:", err);
      toast.error("Could not sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" aria-label="StudioSpace home">
          <Image
            src="/images/studiospace-logo-for-dark-theme.png"
            alt="StudioSpace"
            width={1800}
            height={480}
            priority
            style={{ width: "auto" }}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm whitespace-nowrap transition-colors",
                pathname === link.href
                  ? "border-b-2 border-amber-400 pb-1 font-medium text-amber-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="Switch theme"
                  className="relative grid size-9 place-items-center overflow-hidden rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-accent"
                />
              }
            >
              <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 bg-popover p-1.5 text-popover-foreground ring-border"
            >
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="px-3 py-2 text-sm focus:bg-accent"
              >
                <Sun className="size-4" /> Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="px-3 py-2 text-sm focus:bg-accent"
              >
                <Moon className="size-4" /> Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="px-3 py-2 text-sm focus:bg-accent"
              >
                <Laptop className="size-4" /> System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {showAvatar ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="Account menu"
                    className="grid size-9 place-items-center rounded-full bg-amber-400 text-xs font-bold text-black ring-1 ring-amber-300/30 transition-colors hover:bg-amber-300"
                  >
                    {initials || "U"}
                  </button>
                }
              />
              <DropdownMenuContent
                align="end"
                className="w-56 bg-popover p-1.5 text-popover-foreground ring-border"
              >
                <DropdownMenuGroup>
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold text-foreground">
                      {isPending ? "Loading..." : displayName}
                    </p>
                    {displayEmail ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {displayEmail}
                      </p>
                    ) : null}
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-border" />
                {accountLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.label}
                    render={<Link href={link.href} />}
                    className="px-3 py-2 text-sm text-muted-foreground focus:bg-accent focus:text-foreground"
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => void handleLogout()}
                  disabled={signingOut}
                  className="px-3 py-2 text-sm text-red-500 focus:bg-red-500/10 focus:text-red-500"
                >
                  {signingOut ? "Signing out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                variant="outline"
                className="hidden sm:inline-flex"
              >
                Login
              </Button>
              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                className="bg-amber-400 text-black hover:bg-amber-300"
              >
                Register
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label="Open menu"
                  className="grid size-9 place-items-center rounded-lg border border-border bg-muted text-foreground transition-colors hover:bg-accent md:hidden"
                />
              }
            >
              <Menu className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-popover p-1.5 text-popover-foreground ring-border md:hidden"
            >
              {links.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  render={<Link href={link.href} />}
                  className={cn(
                    "px-3 py-2 text-sm focus:bg-accent",
                    pathname === link.href
                      ? "text-amber-500"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
              {loggedIn ? (
                <>
                  <DropdownMenuSeparator className="bg-border" />
                  {accountLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.label}
                      render={<Link href={link.href} />}
                      className="px-3 py-2 text-sm text-muted-foreground focus:bg-accent"
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
