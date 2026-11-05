"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

const fieldClassName =
  "h-11 border-input bg-background text-foreground placeholder:text-muted-foreground";

const labelClassName = "text-[13px] font-normal text-muted-foreground";

const sectionClassName = "mt-8 text-base font-semibold text-amber-500";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Music Suite",
  "Podcast Lounge",
  "Workshop",
];

const amenityOptions = [
  "Lighting kit",
  "WiFi",
  "Green screen",
  "Air conditioning",
  "Soundproofing",
  "Parking",
  "Makeup room",
  "Mic set",
];

export default function AddStudioPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>("Photo Studio");
  const [overview, setOverview] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [deposit, setDeposit] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const [amenities, setAmenities] = useState<string[]>([
    "Lighting kit",
    "WiFi",
    "Air conditioning",
  ]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((entry) => entry !== amenity)
        : [...current, amenity]
    );
  };

  const previewVisible = imageUrl.trim().length > 0 && failedUrl !== imageUrl;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    if (!session?.user) {
      toast.error("Please log in to publish a studio.");
      router.replace("/login");
      return;
    }

    const price = Number(hourlyRate);
    if (!title.trim()) {
      toast.error("Please enter a title for your studio.");
      return;
    }
    if (!location.trim()) {
      toast.error("Please enter a location.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Please enter a valid hourly rate.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/studios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category ?? "Photo Studio",
          location: location.trim(),
          price,
          ...(deposit ? { securityDeposit: Number(deposit) } : {}),
          ...(capacity ? { capacity: Number(capacity) } : {}),
          ...(overview.trim() ? { overview: overview.trim() } : {}),
          amenities,
          ...(imageUrl.trim() ? { image: imageUrl.trim() } : {}),
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        error?: string;
        id?: string;
      } | null;

      if (!res.ok) {
        toast.error(data?.error ?? `Could not publish the studio (${res.status})`);
        return;
      }

      toast.success("Studio published! It is now live on StudioSpace.");
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      console.error("create studio failed:", err);
      toast.error("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-3xl px-6 py-12">
          <Skeleton className="mx-auto h-10 w-64" />
          <div className="mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8">
            <Skeleton className="h-6 w-32" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Add New Studio</h1>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1 w-14 rounded-full bg-amber-400"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Tell creators about your space.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          <h2 className="text-base font-semibold text-amber-500">Basics</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="title" className={labelClassName}>
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Halo Cyc Wall Studio"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category" className={labelClassName}>
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setCategory(typeof value === "string" ? value : null)
                }
              >
                <SelectTrigger
                  id="category"
                  className="h-11 border-input bg-background text-foreground data-[size=default]:h-11"
                >
                  <SelectValue placeholder="Photo Studio" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground ring-border">
                  {categories.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className="focus:bg-accent focus:text-accent-foreground"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <Label htmlFor="overview" className={labelClassName}>
              Detailed overview
            </Label>
            <Textarea
              id="overview"
              placeholder="Describe the space, lighting and what it suits...."
              value={overview}
              onChange={(event) => setOverview(event.target.value)}
              className="min-h-28 border-input bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <h2 className={sectionClassName}>Pricing &amp; capacity</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="rate" className={labelClassName}>
                Hourly rate ($)
              </Label>
              <Input
                id="rate"
                type="number"
                min={0}
                placeholder="45"
                value={hourlyRate}
                onChange={(event) => setHourlyRate(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deposit" className={labelClassName}>
                Security deposit ($)
              </Label>
              <Input
                id="deposit"
                type="number"
                min={0}
                placeholder="100"
                value={deposit}
                onChange={(event) => setDeposit(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="capacity" className={labelClassName}>
                Max capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                placeholder="12"
                value={capacity}
                onChange={(event) => setCapacity(event.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <h2 className={sectionClassName}>Location &amp; media</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="location" className={labelClassName}>
                Location / address
              </Label>
              <Input
                id="location"
                placeholder="House 12, Road 5, Gulshan"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image-url" className={labelClassName}>
                Image URL
              </Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://i.ibb.co/..."
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className={fieldClassName}
              />
            </div>
          </div>

          <div className="relative mt-4 flex min-h-32 items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-amber-900/70 via-muted to-muted-foreground/20">
            {previewVisible ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Studio image preview"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setFailedUrl(imageUrl)}
              />
            ) : (
              <span className="text-sm text-muted-foreground">
                Live image preview
              </span>
            )}
          </div>

          <h2 className={sectionClassName}>Amenities</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {amenityOptions.map((amenity) => {
              const selected = amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? "rounded-full bg-amber-400 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-300"
                      : "rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  }
                >
                  {amenity}
                </button>
              );
            })}
          </div>

          <h2 className={sectionClassName}>Host</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="host-name" className={labelClassName}>
                Name (read-only)
              </Label>
              <Input
                id="host-name"
                value={session?.user?.name ?? ""}
                readOnly
                className={`${fieldClassName} text-muted-foreground`}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="host-email" className={labelClassName}>
                Email (read-only)
              </Label>
              <Input
                id="host-email"
                value={session?.user?.email ?? ""}
                readOnly
                className={`${fieldClassName} text-muted-foreground`}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-8 h-11 w-full bg-amber-400 text-black hover:bg-amber-300"
          >
            {submitting ? "Publishing..." : "Publish Studio"}
          </Button>
        </form>
      </main>
    </div>
  );
}
