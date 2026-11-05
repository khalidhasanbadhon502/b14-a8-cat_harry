"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { toast } from "sonner";
import type { Studio } from "@/components/studio-card";

const BOOKED_START = "11:00";
const BOOKED_END = "14:00";

const galleryPositions = ["20% 30%", "50% 50%", "80% 70%", "50% 20%"];

function toMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatHours(hours: number): string {
  return Number.isInteger(hours) ? `${hours}` : hours.toFixed(1);
}

interface StudioDetailProps {
  studio: Studio;
}

export function StudioDetail({ studio }: StudioDetailProps) {
  const [selected, setSelected] = useState(0);
  const [date, setDate] = useState("12 Nov 2026");
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("13:00");

  const deposit = studio.securityDeposit ?? 100;
  const capacity = studio.capacity ?? 12;
  const amenities =
    studio.amenities ?? ["WiFi", "Air conditioning", "Parking"];
  const host = studio.host ?? { name: "StudioSpace Host", hostingSince: 2024 };
  const overview =
    studio.overview ??
    `Book ${studio.title} by the hour and get everything you need for a smooth session.`;

  const gallery = studio.images?.length
    ? studio.images.map((src, index) => ({
        src,
        position: galleryPositions[index % galleryPositions.length],
      }))
    : studio.image
      ? galleryPositions.map((position) => ({ src: studio.image!, position }))
      : [];

  const activeImage = gallery[selected] ?? gallery[0];

  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);
  const bookedStart = toMinutes(BOOKED_START)!;
  const bookedEnd = toMinutes(BOOKED_END)!;
  const validRange =
    startMinutes !== null && endMinutes !== null && endMinutes > startMinutes;
  const hours = validRange ? (endMinutes! - startMinutes!) / 60 : 0;
  const slotBooked =
    startMinutes !== null &&
    endMinutes !== null &&
    startMinutes < bookedEnd &&
    endMinutes > bookedStart;
  const subtotal = hours * studio.price;

  const handleBook = () => {
    if (!validRange) {
      toast.error("Please choose a valid start and end time.");
      return;
    }
    if (slotBooked) {
      toast.error(
        `That slot is already booked (${BOOKED_START}–${BOOKED_END}). Pick another time.`
      );
      return;
    }
    toast.success(
      `Booking requested for ${date}, ${start}–${end} — ${formatHours(hours)} hrs × $${studio.price}.`
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-8">
        <nav className="flex flex-wrap gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/studios" className="hover:text-foreground">
            Studios
          </Link>
          <span>/</span>
          <span>{studio.title}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-gradient-to-br from-amber-900/50 via-muted to-muted-foreground/30">
              {activeImage ? (
                <Image
                  src={activeImage.src}
                  alt={studio.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  style={{ objectPosition: activeImage.position }}
                />
              ) : null}
            </div>

            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((entry, index) => (
                <button
                  key={`${entry.src}-${index}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-label={`Show image ${index + 1} of ${gallery.length}`}
                  aria-current={index === selected}
                  className={`relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-amber-900/50 via-muted to-muted-foreground/30 transition-all ${
                    index === selected
                      ? "ring-2 ring-amber-400 opacity-100"
                      : "ring-1 ring-border opacity-70 hover:opacity-100 hover:ring-foreground/30"
                  }`}
                >
                  <Image
                    src={entry.src}
                    alt={`${studio.title} view ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 25vw, 16vw"
                    className="object-cover"
                    style={{ objectPosition: entry.position }}
                  />
                </button>
              ))}
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">
              {studio.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="fill-amber-500 text-amber-500" />
              <span className="font-medium text-foreground">
                {studio.rating}
              </span>
              <span>· {studio.location}</span>
              <span>· {studio.category}</span>
              <span>· up to {capacity} people</span>
            </div>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {overview}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-foreground"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold">Host</h2>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted p-4">
                <span
                  aria-hidden
                  className="size-10 shrink-0 rounded-full bg-amber-400/75 ring-1 ring-amber-300/30"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {host.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Verified host · Hosting since {host.hostingSince}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-5">
              <p>
                <span className="text-3xl font-bold">${studio.price}</span>
                <span className="text-sm text-muted-foreground"> / hr</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Security deposit ${deposit} · Capacity {capacity}
              </p>

              <label
                htmlFor="booking-date"
                className="mt-5 block text-xs font-medium text-muted-foreground"
              >
                Date:
              </label>
              <input
                id="booking-date"
                type="text"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-amber-400/50"
              />

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="booking-start"
                    className="block text-xs font-medium text-muted-foreground"
                  >
                    Start
                  </label>
                  <input
                    id="booking-start"
                    type="time"
                    value={start}
                    onChange={(event) => setStart(event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-amber-400/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-end"
                    className="block text-xs font-medium text-muted-foreground"
                  >
                    End
                  </label>
                  <input
                    id="booking-end"
                    type="time"
                    value={end}
                    onChange={(event) => setEnd(event.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              {slotBooked ? (
                <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs leading-relaxed text-red-500 dark:text-red-400">
                  This slot is already booked ({BOOKED_START}–{BOOKED_END}).
                  Please choose another time.
                </p>
              ) : null}

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {formatHours(hours)} hrs × {studio.price}
                  </span>
                  <span className="font-semibold">${subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Security deposit
                  </span>
                  <span className="font-semibold">${deposit}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBook}
                className="mt-5 w-full rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-300"
              >
                Book Workspace Now
              </button>
              <button
                type="button"
                onClick={() =>
                  toast.success(`${studio.title} saved to your wishlist.`)
                }
                className="mt-3 w-full rounded-xl border border-border bg-muted py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Save to wishlist
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
