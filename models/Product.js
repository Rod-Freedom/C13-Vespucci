import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (product) => {
        try {
          product.price = Number(product.price);
          product.stock = Number(product.stock);
          return product

        } catch (err) {
          throw new Error(err.message)
        }
      },
      beforeUpdate: async (product) => {
        try {
          product.price = Number(product.price);
          product.stock = Number(product.stock);
          return product

        } catch (err) {
          throw new Error(err.message)
        }
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

export default Product;
