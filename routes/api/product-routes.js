import express from 'express';
import { Product, Category, Tag, ProductTag } from '../../models/index.js';
import { PdcTagObj } from '../../utils/reqObjs.js';

const router = express.Router();

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const renderPdcs = await Product.findAll({
      include: [
        { model: Category }, 
        { model: ProductTag, include: [{ model: Tag }] }]
    });

    if (!renderPdcs) {
      res.status(404).json({ message: 'Sorry, no results.' });
      return;
    }
    
    res.status(200).json(renderPdcs);

  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  const { params: { id } } = req;

  try {
    const renderPdc = await Product.findByPk(id, {
      include: [
        { model: Category }, 
        { model: ProductTag, include: [{ model: Tag }] }]
    });

    if (!renderPdc) {
      res.status(404).json({ message: 'Sorry, no results.' });
      return;
    }
    
    res.status(200).json(renderPdc);

  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  const { body, body: { tagIds } } = req;

  try {
    const product = await Product.create(body);
    
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (tagIds && (tagIds.length > 0)) {
      const { id: pdcID } = product;
      const productTagIdArr = tagIds.map(tagID => new PdcTagObj(pdcID, tagID));
      await ProductTag.bulkCreate(productTagIdArr);

      const renderPdcs = await Product.findByPk(pdcID, {
        include: [
          { model: Category }, 
          { model: ProductTag, include: [{ model: Tag }] }]
      });
      
      res.status(200).json(renderPdcs);

    } else res.status(200).json(product);

  } catch (err) {
    res.status(400).json(err);
  };
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

export default router;
