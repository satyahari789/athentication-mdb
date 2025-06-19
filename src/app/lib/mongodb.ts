import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

declare global {
  // Declare a custom property on globalThis
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const globalCache = global as typeof global & {
  _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalCache._mongooseCache) {
  globalCache._mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (globalCache._mongooseCache.conn) return globalCache._mongooseCache.conn;

  if (!globalCache._mongooseCache.promise) {
    globalCache._mongooseCache.promise = mongoose.connect(MONGODB_URI);
  }

  globalCache._mongooseCache.conn = await globalCache._mongooseCache.promise;
  return globalCache._mongooseCache.conn;
}
