import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let cachedDb = null;

export async function connectToDatabase() {
  try {
    if (cachedDb) {
      console.log('Using cached database connection');
      return cachedDb;
    }

    console.log('Connecting to MongoDB...');
    await client.connect();
    const db = client.db();
    cachedDb = db;
    console.log('Successfully connected to MongoDB');
    return db;
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
