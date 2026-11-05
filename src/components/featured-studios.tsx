"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Studio } from "@/components/studio-card";
import { sampleStudios } from "@/lib/studios";

export function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>(sampleStudios.slice(0, 3));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/studios");
        if (!res.ok) return;
        const data = (await res.json()) as Studio[];
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          const top = [...data]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
          setStudios(top);
        }
      } catch {
        // keep fallback studios
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Featured Studios
        </h2>
        <div
          aria-hidden
          className="mx-auto mt-3 h-1 w-12 rounded-full bg-amber-400"
        />
        <p className="mt-4 text-center text-muted-foreground">
          Top-rated spaces creators book again and again.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio, index) => (
            <div
              key={studio.id ?? `${studio.title}-${studio.location}-${index}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl"
            >
              <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-amber-900/50 via-muted to-muted-foreground/30">
                {studio.image ? (
                  <Image
                    src={studio.image}
                    alt={studio.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
                <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  {studio.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {studio.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {studio.location}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="fill-amber-500" />
                    <span className="text-sm font-semibold text-foreground">
                      {studio.rating}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-foreground">
                      ${studio.price}
                    </span>
                    <span className="text-xs text-muted-foreground"> / hr</span>
                  </div>
                </div>

                <Link
                  href={`/studios/${studio.id}`}
                  className="mt-4 block w-full rounded-xl bg-amber-400 py-2.5 text-center text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
