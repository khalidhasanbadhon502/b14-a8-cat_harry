"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StudioCard, type Studio } from "@/components/studio-card";
import { sampleStudios } from "@/lib/studios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chips: { label: string; categories: string[] | null }[] = [
  { label: "All", categories: null },
  { label: "Photo Studios", categories: ["Photo Studio"] },
  { label: "Sound Stages", categories: ["Film Stage"] },
  { label: "Podcast Rooms", categories: ["Podcast Room", "Podcast Lounge"] },
  { label: "Music Suites", categories: ["Music Suite"] },
  { label: "Art Workshops", categories: ["Art Workshop", "Workshop"] },
];

const sorts = ["Top rated", "Price: low to high", "Price: high to low"];

function ExploreStudiosPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [studios, setStudios] = useState<Studio[]>(sampleStudios);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [userChip, setUserChip] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>("Top rated");

  const paramChip = categoryParam
    ? (chips.find((chip) =>
        chip.categories?.some(
          (category) =>
            category.toLowerCase() === categoryParam.toLowerCase() ||
            chip.label.toLowerCase().includes(categoryParam.toLowerCase())
        )
      ) ?? null)
    : null;
  const activeChip = userChip ?? paramChip?.label ?? "All";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/studios");
        if (!res.ok) return;
        const data = (await res.json()) as Studio[];
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setStudios(data);
        }
      } catch {
        // keep sample fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const chip = chips.find((c) => c.label === activeChip);
  let visible = studios;
  if (chip?.categories) {
    visible = visible.filter((s) => chip.categories!.includes(s.category));
  }
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    visible = visible.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
    );
  }
  visible = [...visible].sort((a, b) => {
    if (sort === "Price: low to high") return a.price - b.price;
    if (sort === "Price: high to low") return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Explore Studios</h1>
          <div
            aria-hidden
            className="mx-auto mt-3 h-1 w-14 rounded-full bg-amber-400"
          />
          <p className="mt-4 text-sm text-muted-foreground">
            {loading
              ? "Loading creative spaces..."
              : `${studios.length} creative spaces ready to book.`}
          </p>
        </header>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Input
            type="search"
            placeholder="Search by title or location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 flex-1 border-input bg-background text-foreground placeholder:text-muted-foreground"
          />
          <Select
            value={sort}
            onValueChange={(value) =>
              setSort(typeof value === "string" ? value : null)
            }
          >
            <SelectTrigger className="h-10 w-44 border-input bg-background text-foreground data-[size=default]:h-10">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground ring-border">
              {sorts.map((option) => (
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
          <Button
            type="button"
            variant="outline"
            className="h-10 px-5"
          >
            Filters
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((entry) => {
            const active = entry.label === activeChip;
            return (
              <button
                key={entry.label}
                type="button"
                onClick={() => setUserChip(entry.label)}
                className={
                  active
                    ? "h-8 rounded-full bg-amber-400 px-4 text-sm font-medium text-black"
                    : "h-8 rounded-full border border-border bg-muted px-4 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                }
              >
                {entry.label}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          {loading
            ? "Loading..."
            : `Showing ${visible.length} of ${studios.length} studios`}
        </p>

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Skeleton className="h-52 w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))
          ) : visible.length === 0 ? (
            <div className="col-span-full py-16 text-center text-muted-foreground">
              No studios match your search.
            </div>
          ) : (
            visible.map((studio, index) => (
              <StudioCard
                key={studio.id}
                studio={studio}
                priority={index === 0}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default function ExploreStudiosRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground">
          <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="h-80 w-full rounded-2xl" />
              ))}
            </div>
          </main>
        </div>
      }
    >
      <ExploreStudiosPage />
    </Suspense>
  );
}
