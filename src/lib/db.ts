import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.DATABASE_URL!;
const DB_NAME = process.env.DB_NAME ?? "task-flow";

const globalForMongo = globalThis as unknown as {
  _mongo?: { client: MongoClient; db: Db };
};

export async function getDb(): Promise<Db> {
  if (globalForMongo._mongo) return globalForMongo._mongo.db;
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  globalForMongo._mongo = { client, db };
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getCollection<TSchema extends object = any>(
  name: string
): Promise<Collection<TSchema>> {
  const db = await getDb();
  return db.collection<TSchema>(name);
}

export async function closeDb(): Promise<void> {
  if (globalForMongo._mongo) {
    await globalForMongo._mongo.client.close();
    globalForMongo._mongo = undefined;
  }
}