import express from 'express';
import { Tag, Product, ProductTag } from '../../models/index.js';
import { TagObj } from '../../utils/resObjs.js';

const router = express.Router();

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const renderTags = await Tag.findAll({
      include: [{ model: ProductTag, include: [{ model: Product }] }]
    });

    if (!renderTags) return res.status(404).json({ message: 'Sorry, no results.' });
    
    res.status(200).json(renderTags);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  const { params: { id } } = req;

  try {
    const renderTag = await Tag.findByPk(id, {
      include: [{ model: ProductTag, include: [{ model: Product }] }]
    });

    if (!renderTag) return res.status(404).json({ message: 'Sorry, no results.' });
    
    res.status(200).json(renderTag);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  const { body } = req;

  try {
    const newTag = await Tag.create(body);
    
    const resObj = new TagObj(newTag, 'added');
    
    res.status(200).json(resObj);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name
  const { body, params: { id } } = req;
  
  const queriesObj = { where: { id: id } };
  
  try {
    const [ updateTag ] = await Tag.update(body, queriesObj);
    const renderTag = await Tag.findByPk(id);
    
    const resObj = new TagObj(renderTag, 'updated', Number(updateTag));
    
    res.status(200).json(resObj);
  
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const { params: { id } } = req;

  const queriesObj = { where: { id: id } };

  try {
    const deleteTag = await Tag.destroy(queriesObj);
    
    const resObj = new TagObj(false, 'deleted', deleteTag);

    res.status(200).json(resObj);

  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
