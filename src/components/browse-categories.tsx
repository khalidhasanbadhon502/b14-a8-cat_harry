"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sampleStudios } from "@/lib/studios";

interface Category {
  name: string;
  count: number;
}

interface RawCategory {
  _id?: string;
  name?: string;
  title?: string;
  count?: number;
}

function toCategories(raw: RawCategory[]): Category[] {
  return raw.map((entry) => ({
    name: entry.name ?? entry.title ?? "Untitled",
    count: entry.count ?? 0,
  }));
}

function extractCategories(data: unknown): Category[] | null {
  if (Array.isArray(data)) return toCategories(data as RawCategory[]);
  if (data && typeof data === "object") {
    const object = data as { categories?: unknown; data?: unknown };
    if (Array.isArray(object.categories)) {
      return toCategories(object.categories as RawCategory[]);
    }
    if (Array.isArray(object.data)) {
      return toCategories(object.data as RawCategory[]);
    }
  }
  return null;
}

function fallbackCategories(): Category[] {
  const counts = new Map<string, number>();
  for (const studio of sampleStudios) {
    counts.set(studio.category, (counts.get(studio.category) ?? 0) + 1);
  }
  return Array.from(counts, ([name, count]) => ({ name, count }));
}

export function BrowseCategories() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) return;
        const extracted = extractCategories(await res.json());
        if (!cancelled && extracted && extracted.length > 0) {
          setCategories(extracted);
        }
      } catch {
        // keep fallback categories
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Browse by Category
        </h2>
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
        />
        <p className="mt-4 text-center text-muted-foreground">
          Jump straight to the kind of space you need.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-5">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.name}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="rounded-xl border border-border bg-card px-4 py-6 text-center transition-colors hover:border-amber-400/40"
              >
                <span className="block text-base font-semibold text-foreground">
                  {category.name}
                </span>
                <span className="mt-1.5 block text-sm text-muted-foreground">
                  {category.count} spaces
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
