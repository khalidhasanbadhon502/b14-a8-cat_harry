import { MongoClient, type Collection, type Db, type Document } from "mongodb";

const uri =
  process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/studiospace";

const globalWithMongo = globalThis as typeof globalThis & {
  __mongoClient?: MongoClient;
  __mongoClientPromise?: Promise<MongoClient>;
  __studiosIndexReady?: boolean;
};

function ensureClient(): MongoClient {
  if (!globalWithMongo.__mongoClient) {
    const client = new MongoClient(uri);
    globalWithMongo.__mongoClient = client;
    globalWithMongo.__mongoClientPromise = client.connect();
  }
  return globalWithMongo.__mongoClient;
}

export function getClient(): MongoClient {
  return ensureClient();
}

export function getDbSync(): Db {
  return ensureClient().db();
}

export async function getDb(): Promise<Db> {
  const client = ensureClient();
  await globalWithMongo.__mongoClientPromise;
  return client.db();
}

export async function ensureStudiosIndex<T extends Document>(
  studios: Collection<T>
): Promise<void> {
  if (globalWithMongo.__studiosIndexReady) return;
  try {
    await studios.createIndex({ ownerId: 1 });
    await studios.createIndex({ category: 1 });
    globalWithMongo.__studiosIndexReady = true;
  } catch (error) {
    console.error("studios index error:", error);
  }
}
