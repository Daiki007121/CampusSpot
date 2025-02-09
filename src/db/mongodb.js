import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Using cached database connection');
    return { client: cachedClient, db: cachedDb };
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }); // タイムアウトを5秒に設定
  await client.connect();
  const db = client.db();

  cachedClient = client;
  cachedDb = db;
  console.log('Successfully connected to MongoDB');

  return { client, db };
}

export function getCollection(name) {
  if (!cachedDb) {
    console.log('No database connection');
    throw new Error('Call connectToDatabase first');
  }
  return cachedDb.collection(name);
}
