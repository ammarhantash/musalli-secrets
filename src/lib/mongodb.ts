import { MongoClient, Db } from "mongodb";

// Reads credentials from .env (MONGODB_URI / MONGODB_DB).
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "musallis";

if (!uri) {
  throw new Error("MONGODB_URI is not set. Add it to your .env file.");
}

// Reuse the client across hot-reloads in dev to avoid exhausting connections.
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
