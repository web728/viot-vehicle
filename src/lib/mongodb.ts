import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  var viotMongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  if (!uri) return null;
  if (process.env.NODE_ENV === "development") {
    if (!global.viotMongoClientPromise) global.viotMongoClientPromise = new MongoClient(uri, options).connect();
    return global.viotMongoClientPromise;
  }
  return new MongoClient(uri, options).connect();
}
