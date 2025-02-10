import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  try {
    if (cachedClient && cachedDb) {
      console.log('Using cached database connection');
      return { client: cachedClient, db: cachedDb };
    }
    console.log('Connecting to MongoDB...', uri); // URIの最初の部分だけログ出力
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    cachedClient = client;
    cachedDb = db;
    console.log('Successfully connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getCollection(name) {
  if (!cachedDb) {
    console.log('No database connection');
    throw new Error('Call connectToDatabase first');
  }
  return cachedDb.collection(name);
}
