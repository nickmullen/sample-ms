"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("translations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      recordId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      recordType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });

    // Optionally, you can create an index to speed up queries
    // that filter by (recordType, recordId). For example:
    await queryInterface.addIndex("translations", ["recordType", "recordId"]);
  },

  async down(queryInterface) {
    // Drop index first if you created one
    await queryInterface.removeIndex("translations", ["recordType", "recordId"]);
    await queryInterface.dropTable("translations");
  }
};
