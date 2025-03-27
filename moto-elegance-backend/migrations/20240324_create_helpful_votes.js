"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("helpfulVotes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "reviews",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // Add unique constraint to prevent multiple votes from the same user
    await queryInterface.addConstraint("helpfulVotes", {
      fields: ["reviewId", "userId"],
      type: "unique",
      name: "unique_review_user_vote",
    });

    // Add indexes
    await queryInterface.addIndex("helpfulVotes", ["reviewId"]);
    await queryInterface.addIndex("helpfulVotes", ["userId"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("helpfulVotes");
  },
};
