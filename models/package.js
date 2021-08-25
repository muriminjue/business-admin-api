"use strict";
const { Model } = require("sequelize");
const product = require("./product");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
      this.belongsTo(Product, { foreignKey: "productId" });
    }
  }
  Package.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      number: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "packages",
      modelName: "Package",
    }
  );
  return Package;
};
