import { Tag } from '../models/index.js';

const tagData = [
  {
    name: 'rock music',
  },
  {
    name: 'pop music',
  },
  {
    name: 'blue',
  },
  {
    name: 'red',
  },
  {
    name: 'green',
  },
  {
    name: 'white',
  },
  {
    name: 'gold',
  },
  {
    name: 'pop culture',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

export default seedTags;
