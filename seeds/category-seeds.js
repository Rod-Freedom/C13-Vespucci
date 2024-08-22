import { Category } from '../models/index.js';

const categoryData = [
  {
    name: 'Shirts',
  },
  {
    name: 'Shorts',
  },
  {
    name: 'Music',
  },
  {
    name: 'Hats',
  },
  {
    name: 'Shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

export default seedCategories;
