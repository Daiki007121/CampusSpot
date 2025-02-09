import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './db/mongodb.js';
import spotsRouter from './routes/spots.js';
import reviewsRouter from './routes/reviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ✅ **MongoDB connection test endpoint**
app.get('/api/test-db', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collections = await db.listCollections().toArray();
    res.json({ success: true, collections });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📌 `spots` API endpoint
app.use('/api/spots', async (req, res, next) => {
  try {
    await connectToDatabase();
    spotsRouter(req, res, next);
  } catch (error) {
    console.error('Error in spots route:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// 📌 `reviews` API endpoint
app.use('/api/reviews', async (req, res, next) => {
  try {
    await connectToDatabase();
    reviewsRouter(req, res, next);
  } catch (error) {
    console.error('Error in reviews route:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// ✅ Export app for Vercel deployment
export default app;

// ✅ Start server for local development
if (process.env.NODE_ENV !== 'production') {
  const startServer = async () => {
    try {
      await connectToDatabase();
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}
