import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';

export interface StudioHost {
  name: string;
  hostingSince: number;
}

export interface Studio {
  id: string;
  title: string;
  category: string;
  location: string;
  rating: number;
  price: number;
  image?: string;
  images?: string[];
  capacity?: number;
  securityDeposit?: number;
  overview?: string;
  amenities?: string[];
  host?: StudioHost;
}

interface StudioCardProps {
  studio: Studio;
  priority?: boolean;
}

export function StudioCard({ studio, priority }: StudioCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl">
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900/50 via-muted to-muted-foreground/30">
        {studio.image ? (
          <Image
            src={studio.image}
            alt={studio.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}

        <span className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {studio.category}
        </span>

        <button
          type="button"
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-neutral-300 backdrop-blur-md transition-colors hover:text-amber-400"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="truncate text-lg font-bold tracking-tight text-foreground">
          {studio.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {studio.location}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center space-x-1.5 text-amber-500">
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
  );
}
