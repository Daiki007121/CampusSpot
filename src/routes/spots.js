import express from 'express';
import { getCollection } from '../db/mongodb.js';

const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {
  try {
    const spots = await getCollection('spots').find().toArray();
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new spot
router.post('/', async (req, res) => {
  try {
    const spot = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await getCollection('spots').insertOne(spot);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get spot by ID
router.get('/:id', async (req, res) => {
  try {
    const spot = await getCollection('spots').findOne({ _id: req.params.id });
    if (spot) {
      res.json(spot);
    } else {
      res.status(404).json({ message: 'Spot not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
