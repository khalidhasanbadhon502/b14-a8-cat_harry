import "server-only";
import { ObjectId, type Collection, type Document, type Filter } from "mongodb";
import { ensureStudiosIndex, getDb } from "@/lib/mongodb";
import {
  sampleCategoryCounts,
  sampleStudios,
  type StudioInput,
} from "@/lib/studios";
import type { Studio } from "@/components/studio-card";

type StudioDoc = Document & {
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
  host?: { name: string; hostingSince: number };
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type StudioOwner = {
  id: string;
  name: string;
  email?: string;
};

export type UpdateResult =
  | { status: "ok"; studio: Studio }
  | { status: "not-found" }
  | { status: "forbidden" };

async function getStudios(): Promise<Collection<StudioDoc>> {
  const db = await getDb();
  const studios = db.collection<StudioDoc>("studios");
  await ensureStudiosIndex(studios);
  return studios;
}

function idFilter(id: string): Filter<StudioDoc> {
  if (ObjectId.isValid(id)) {
    return { $or: [{ _id: new ObjectId(id) }, { id }] } as Filter<StudioDoc>;
  }
  return { id } as Filter<StudioDoc>;
}

function toStudio(doc: StudioDoc): Studio {
  return {
    id:
      doc._id instanceof ObjectId ? doc._id.toString() : String(doc._id),
    title: doc.title,
    category: doc.category,
    location: doc.location,
    rating: doc.rating,
    price: doc.price,
    image: doc.image,
    images: doc.images,
    capacity: doc.capacity,
    securityDeposit: doc.securityDeposit,
    overview: doc.overview,
    amenities: doc.amenities,
    host: doc.host,
  };
}

async function ensureSeeded(studios: Collection<StudioDoc>): Promise<void> {
  const count = await studios.countDocuments();
  if (count > 0) return;

  const now = new Date();
  await studios.insertMany(
    sampleStudios.map((studio) => ({
      ...studio,
      rating: studio.rating ?? 4.5,
      createdAt: now,
      updatedAt: now,
    })) as StudioDoc[]
  );
}

export async function listStudios(): Promise<Studio[]> {
  const studios = await getStudios();
  await ensureSeeded(studios);
  const docs = await studios.find({}).sort({ rating: -1 }).toArray();
  return docs.map(toStudio);
}

export async function listStudiosByOwner(ownerId: string): Promise<Studio[]> {
  const studios = await getStudios();
  await ensureSeeded(studios);
  const docs = await studios
    .find({ ownerId })
    .sort({ updatedAt: -1 })
    .toArray();
  return docs.map(toStudio);
}

export async function getStudioById(id: string): Promise<Studio | null> {
  const studios = await getStudios();
  await ensureSeeded(studios);
  const doc = await studios.findOne(idFilter(id));
  return doc ? toStudio(doc) : null;
}

export async function createStudio(
  input: StudioInput,
  owner: StudioOwner
): Promise<Studio> {
  const studios = await getStudios();
  const now = new Date();

  const doc: StudioDoc = {
    ...input,
    rating: 0,
    host: {
      name: owner.name,
      hostingSince: now.getFullYear(),
    },
    ownerId: owner.id,
    ownerName: owner.name,
    ownerEmail: owner.email,
    createdAt: now,
    updatedAt: now,
  };

  const result = await studios.insertOne(doc);
  const created = await studios.findOne({ _id: result.insertedId });
  if (!created) throw new Error("Failed to load created studio");
  return toStudio(created);
}

export async function updateStudio(
  id: string,
  input: Partial<StudioInput>,
  owner: StudioOwner
): Promise<UpdateResult> {
  const studios = await getStudios();
  const filter = idFilter(id);

  const existing = await studios.findOne(filter);
  if (!existing) return { status: "not-found" };
  if (existing.ownerId !== owner.id) return { status: "forbidden" };

  const updated = await studios.findOneAndUpdate(
    filter,
    { $set: { ...input, updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  if (!updated) return { status: "not-found" };
  return { status: "ok", studio: toStudio(updated) };
}

export async function deleteStudio(
  id: string,
  owner: StudioOwner
): Promise<"not-found" | "forbidden" | "deleted"> {
  const studios = await getStudios();
  const filter = idFilter(id);

  const existing = await studios.findOne(filter);
  if (!existing) return "not-found";
  if (existing.ownerId !== owner.id) return "forbidden";

  await studios.deleteOne(filter);
  return "deleted";
}

export async function listCategories(): Promise<
  { name: string; count: number }[]
> {
  try {
    const studios = await getStudios();
    await ensureSeeded(studios);
    const grouped = await studios
      .aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray();

    const categories = grouped
      .filter((entry) => entry._id)
      .map((entry) => ({ name: entry._id, count: entry.count }));

    if (categories.length > 0) return categories;
  } catch (error) {
    console.error("categories error:", error);
  }

  return sampleCategoryCounts();
}
