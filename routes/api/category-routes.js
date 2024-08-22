import express from 'express';
import { Category, Product } from '../../models/index.js';
import { CtgObj } from '../../utils/resObjs.js';

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
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const { params: { id } } = req;

  try {
    const renderCtgs = await Category.findByPk(id, {
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

router.post('/', async (req, res) => {
  // create a new category
  const { body, body: { product } } = req;

  try {
    const newCtg = await Category.create(body);
    
    if (product) {
      const { id } = newCtg;
      
      product.category_id = id;
      await Product.create(product);

      const renderCtg = await Category.findByPk(id, {
        include: [{ model: Product }]
      });

      const resObj = new CtgObj(renderCtg, 'added');

      res.status(200).json(resObj);

    } else {
      const resObj = new CtgObj(newCtg, 'added');

      res.status(200).json(resObj);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const { body, params: { id } } = req;

  const queriesObj = { where: { id: id } };

  try {
    const updateCtg = await Category.update(body, queriesObj);
    
    const renderCtg = await Category.findByPk(id, {
      include: [{ model: Product }]
    });
    
    const resObj = new CtgObj(renderCtg, 'updated', updateCtg);

    res.status(200).json(resObj);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const { params: { id } } = req;

  const queriesObj = { where: { id: id } };

  try {
    const deleteCtg = await Category.destroy(queriesObj);
    
    const resObj = new CtgObj(false, 'deleted', deleteCtg);

    res.status(200).json(resObj);

  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
