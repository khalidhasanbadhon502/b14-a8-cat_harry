import type { Studio } from "@/components/studio-card";

export type StudioHost = {
  name: string;
  hostingSince: number;
};

export type StudioInput = {
  title: string;
  category: string;
  location: string;
  price: number;
  securityDeposit?: number;
  capacity?: number;
  overview?: string;
  amenities?: string[];
  image?: string;
  images?: string[];
};

export const sampleStudios: Studio[] = [
  {
    id: "1",
    title: "Halo Cyc Wall Studio",
    category: "Photo Studio",
    location: "Gulshan, Dhaka",
    rating: 4.9,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 12,
    securityDeposit: 100,
    overview:
      "A 1,200 sq ft white cyclorama studio with natural north light, a blackout option and a dedicated prep room. Ideal for product, fashion and portrait shoots.",
    amenities: [
      "Lighting kit",
      "Backdrops",
      "WiFi",
      "Air conditioning",
      "Makeup room",
      "Parking",
    ],
    host: { name: "Nadia Rahman", hostingSince: 2024 },
  },
  {
    id: "2",
    title: "Northlight Sound Stage",
    category: "Film Stage",
    location: "Banani, Dhaka",
    rating: 4.8,
    price: 120,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 20,
    securityDeposit: 200,
    overview:
      "A 2,400 sq ft blacked-out sound stage with a 14 ft ceiling, overhead grid rigging and isolated power. Built for film, commercial and music video production.",
    amenities: [
      "Grid rigging",
      "Cyclorama wall",
      "WiFi",
      "Air conditioning",
      "Makeup room",
      "Parking",
    ],
    host: { name: "Tanvir Ahmed", hostingSince: 2021 },
  },
  {
    id: "3",
    title: "Echo Room Podcast Lounge",
    category: "Podcast Lounge",
    location: "Dhanmondi, Dhaka",
    rating: 4.7,
    price: 30,
    image: "/images/cardimage.webp",
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 6,
    securityDeposit: 50,
    overview:
      "A cosy acoustic-treated podcast lounge with four broadcast mics, a silent HVAC system and warm ambient lighting. Perfect for interviews and remote shows.",
    amenities: [
      "4 broadcast mics",
      "Acoustic panels",
      "WiFi",
      "Air conditioning",
      "Coffee bar",
      "Ring lights",
    ],
    host: { name: "Sadia Karim", hostingSince: 2023 },
  },
  {
    id: "4",
    title: "Vinyl Lane Recording Suite",
    category: "Music Suite",
    location: "Uttara, Dhaka",
    rating: 4.8,
    price: 60,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 8,
    securityDeposit: 100,
    overview:
      "A warm control-room and live-room pair tuned for tracking vocals and acoustic instruments, with analogue outboard gear and a deeply isolated vocal booth.",
    amenities: [
      "Vocal booth",
      "Studio monitors",
      "WiFi",
      "Air conditioning",
      "Instrument amps",
      "Parking",
    ],
    host: { name: "Rifat Chowdhury", hostingSince: 2022 },
  },
  {
    id: "5",
    title: "Clay & Canvas Art Workshop",
    category: "Workshop",
    location: "Mirpur, Dhaka",
    rating: 4.6,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 15,
    securityDeposit: 50,
    overview:
      "A bright top-floor art workshop with 20 workstations, north-facing windows, sink stations and kiln access for clay and canvas sessions.",
    amenities: [
      "Worktables",
      "Sink stations",
      "WiFi",
      "Natural light",
      "Storage lockers",
      "Parking",
    ],
    host: { name: "Nusrat Jahan", hostingSince: 2024 },
  },
  {
    id: "6",
    title: "Daylight Loft Studio",
    category: "Photo Studio",
    location: "Bashundhara, Dhaka",
    rating: 4.7,
    price: 50,
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop",
    ],
    capacity: 10,
    securityDeposit: 100,
    overview:
      "An airy daylight loft with 12 ft windows, white oak floors and a styled shooting corner for lifestyle and editorial work.",
    amenities: [
      "Shooting corner",
      "Changing room",
      "WiFi",
      "Air conditioning",
      "Props library",
      "Parking",
    ],
    host: { name: "Arif Hasan", hostingSince: 2023 },
  },
];

export function sampleCategoryCounts(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const studio of sampleStudios) {
    counts.set(studio.category, (counts.get(studio.category) ?? 0) + 1);
  }
  return Array.from(counts, ([name, count]) => ({ name, count }));
}

export type ParsedStudioInput = StudioInput | { error: string };

function toPositiveNumber(value: unknown): number | null {
  const parsed = typeof value === "string" ? Number(value) : value;
  if (typeof parsed !== "number" || !Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function optionalStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return items.length > 0 ? items : undefined;
}

type ParseResult =
  | { error: string }
  | { data: Partial<StudioInput> };

function parseBody(body: unknown, partial: boolean): ParseResult {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body" };
  }

  const raw = body as Record<string, unknown>;

  const title = optionalString(raw.title);
  const category = optionalString(raw.category);
  const location = optionalString(raw.location);
  const priceProvided = raw.price !== undefined;
  const price = toPositiveNumber(raw.price);

  if (partial) {
    const hasAnyField =
      title !== undefined ||
      category !== undefined ||
      location !== undefined ||
      priceProvided ||
      raw.securityDeposit !== undefined ||
      raw.capacity !== undefined ||
      raw.overview !== undefined ||
      raw.amenities !== undefined ||
      raw.image !== undefined ||
      raw.images !== undefined;
    if (!hasAnyField) {
      return { error: "No updatable fields were provided" };
    }
  } else {
    if (!title) return { error: "Title is required" };
    if (!category) return { error: "Category is required" };
    if (!location) return { error: "Location is required" };
  }

  if (price === null && (priceProvided || !partial)) {
    return { error: "A valid hourly rate is required" };
  }

  const securityDeposit = toPositiveNumber(raw.securityDeposit);
  const capacity = toPositiveNumber(raw.capacity);

  if (raw.securityDeposit !== undefined && securityDeposit === null) {
    return { error: "Security deposit must be a positive number" };
  }
  if (raw.capacity !== undefined && capacity === null) {
    return { error: "Capacity must be a positive number" };
  }

  const overview = optionalString(raw.overview);
  const amenities = optionalStringArray(raw.amenities);
  const image = optionalString(raw.image);
  const images = optionalStringArray(raw.images);

  const data: Partial<StudioInput> = {
    ...(title !== undefined ? { title } : {}),
    ...(category !== undefined ? { category } : {}),
    ...(location !== undefined ? { location } : {}),
    ...(price !== null ? { price } : {}),
    ...(securityDeposit !== null ? { securityDeposit } : {}),
    ...(capacity !== null ? { capacity } : {}),
    ...(overview !== undefined ? { overview } : {}),
    ...(amenities !== undefined ? { amenities } : {}),
    ...(image !== undefined ? { image } : {}),
    ...(images !== undefined ? { images } : {}),
  };

  return { data };
}

export function parseStudioInput(body: unknown): ParsedStudioInput {
  const result = parseBody(body, false);
  if ("error" in result) return result;

  const { title, category, location, price, ...rest } = result.data;
  if (!title || !category || !location || price === undefined) {
    return { error: "A valid studio payload is required" };
  }

  return { title, category, location, price, ...rest };
}

export function parseStudioPatch(
  body: unknown
): Partial<StudioInput> | { error: string } {
  const result = parseBody(body, true);
  if ("error" in result) return result;
  return result.data;
}
