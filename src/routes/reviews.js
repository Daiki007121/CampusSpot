import express from 'express';
import { getCollection } from '../db/mongodb.js';

const router = express.Router();

// Get reviews for a spot
router.get('/spot/:spotId', async (req, res) => {
  try {
    const reviews = await getCollection('reviews')
      .find({ spotId: req.params.spotId })
      .toArray();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new review
router.post('/', async (req, res) => {
  try {
    const review = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await getCollection('reviews').insertOne(review);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
