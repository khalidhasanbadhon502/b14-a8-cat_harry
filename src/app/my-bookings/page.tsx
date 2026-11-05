"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { sampleStudios } from "@/lib/studios";

type Status = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Filter = "All" | Status;

interface Booking {
  id: string;
  studioId: string;
  title: string;
  when: string;
  total: number;
  status: Status;
}

const filters: Filter[] = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const initialBookings: Booking[] = [
  {
    id: "b1",
    studioId: "1",
    title: "Halo Cyc Wall Studio",
    when: "12 Nov 2026 · 10:00-13:00",
    total: 235,
    status: "Pending",
  },
  {
    id: "b2",
    studioId: "2",
    title: "Northlight Sound Stage",
    when: "18 Nov 2026 · 14:00-18:00",
    total: 580,
    status: "Confirmed",
  },
  {
    id: "b3",
    studioId: "3",
    title: "Echo Room Podcast Lounge",
    when: "2 Oct 2026 · 09:00-11:00",
    total: 60,
    status: "Completed",
  },
  {
    id: "b4",
    studioId: "4",
    title: "Vinyl Lane Recording Suite",
    when: "25 Sep 2026 · 16:00-19:00",
    total: 180,
    status: "Cancelled",
  },
];

const statusBadgeClass: Record<Status, string> = {
  Pending: "bg-amber-400/15 text-amber-600 dark:text-amber-400",
  Confirmed: "bg-green-500/15 text-green-600 dark:text-green-400",
  Completed: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Cancelled: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const outlineButtonClass =
  "border-border bg-muted text-foreground hover:bg-accent";

export default function MyBookingsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const visible =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  const cancelBooking = (id: string) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking
      )
    );
    toast.success("Your booking has been cancelled.");
  };

  const imageFor = (studioId: string) =>
    sampleStudios.find((studio) => studio.id === studioId)?.image;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold tracking-tight">My Bookings</h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((entry) => {
            const active = entry === filter;
            return (
              <button
                key={entry}
                type="button"
                onClick={() => setFilter(entry)}
                className={
                  active
                    ? "h-8 rounded-full bg-amber-400 px-4 text-sm font-medium text-black"
                    : "h-8 rounded-full border border-border bg-muted px-4 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                }
              >
                {entry}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-xl border border-border bg-card py-16 text-center text-muted-foreground">
            No {filter.toLowerCase()} bookings.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {visible.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4 md:flex-nowrap md:gap-6 md:p-5"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-900/80 via-muted to-muted-foreground/30">
                  {imageFor(booking.studioId) ? (
                    <Image
                      src={imageFor(booking.studioId)!}
                      alt={booking.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 basis-56">
                  <p className="truncate text-lg font-bold text-foreground">
                    {booking.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.when}
                  </p>
                </div>

                <p className="w-28 shrink-0 text-sm font-semibold text-foreground md:text-base">
                  ${booking.total} total
                </p>

                <span
                  className={`w-24 shrink-0 rounded-full px-3 py-1 text-center text-xs font-medium ${statusBadgeClass[booking.status]}`}
                >
                  {booking.status}
                </span>

                <div className="ml-auto shrink-0">
                  {booking.status === "Pending" ? (
                    <ButtonLike
                      className={outlineButtonClass}
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </ButtonLike>
                  ) : booking.status === "Confirmed" ? (
                    <ButtonLike
                      className="bg-amber-400 text-black hover:bg-amber-300"
                      onClick={() =>
                        toast.success(
                          `Invoice for ${booking.title} downloaded.`
                        )
                      }
                    >
                      Download Invoice
                    </ButtonLike>
                  ) : booking.status === "Completed" ? (
                    <ButtonLike
                      className={outlineButtonClass}
                      onClick={() =>
                        toast.success(
                          `Thanks for reviewing ${booking.title}!`
                        )
                      }
                    >
                      Leave Review
                    </ButtonLike>
                  ) : (
                    <ButtonLike
                      className={outlineButtonClass}
                      onClick={() =>
                        toast.success(
                          `${booking.title} added to your cart again.`
                        )
                      }
                    >
                      Book Again
                    </ButtonLike>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function ButtonLike({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-lg px-4 text-sm font-medium transition-colors ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
