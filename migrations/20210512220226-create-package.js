"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("packages", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      number: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("packages");
  },
};
