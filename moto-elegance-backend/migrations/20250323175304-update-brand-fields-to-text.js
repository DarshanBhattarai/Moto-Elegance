"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("brands", "logo", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn("brands", "backgroundImage", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("brands", "logo", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.changeColumn("brands", "backgroundImage", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
};
