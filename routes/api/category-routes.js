import express from 'express';
import { Category, Product } from '../../models/index.js';

const router = express.Router();

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const renderCtgs = await Category.findAll({
      include: [{ model: Product }]
    });

    if (!renderCtgs) {
      res.status(404).json({ message: 'Sorry, no results.' });
      return;
    }
    
    res.status(200).json(renderCtgs);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

export default router;
