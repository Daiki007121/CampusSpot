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

app.use('/api/spots', spotsRouter);
app.use('/api/reviews', reviewsRouter);

app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});

// Export app for Vercel
export default app;

// Start server for local development
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
