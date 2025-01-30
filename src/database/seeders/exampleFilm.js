"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("films", [
      { id: "83fb39cf-39b9-4d36-ba90-7d0d74d5ff69", director: "George Lucas" }
    ]);
    await queryInterface.bulkInsert("translations", [
      {
        id: "2ad2e540-c8d1-4ae7-bddf-c1e935e1ddbe",
        recordId: "83fb39cf-39b9-4d36-ba90-7d0d74d5ff69",
        recordType: "film",
        key: "name",
        language: "en",
        value: "Star Wars"
      },
      {
        id: "866c7f34-fa3d-490e-b4bc-3dabab9c617d",
        recordId: "83fb39cf-39b9-4d36-ba90-7d0d74d5ff69",
        recordType: "film",
        key: "name",
        language: "fr",
        value: "La Guerre des étoiles"
      },
      {
        id: "dfae8160-9b06-4f78-96d3-6bd065abbb6a",
        recordId: "83fb39cf-39b9-4d36-ba90-7d0d74d5ff69",
        recordType: "film",
        key: "description",
        language: "en",
        value:
          "Star Wars is an American epic space opera media franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop culture phenomenon."
      },
      {
        id: "2668fb1c-3637-4f53-a5c5-c1bf2cbe0c44",
        recordId: "83fb39cf-39b9-4d36-ba90-7d0d74d5ff69",
        recordType: "film",
        key: "description",
        language: "fr",
        value:
          "Star Wars, en français La Guerre des étoiles, est un univers de science-fiction de type space fantasy créé par le réalisateur, scénariste et producteur américain George Lucas."
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "films",
      {
        id: ["83fb39cf-39b9-4d36-ba90-7d0d74d5ff69"]
      },
      {}
    );

    await queryInterface.bulkDelete(
      "translations",
      {
        recordId: ["83fb39cf-39b9-4d36-ba90-7d0d74d5ff69"]
      },
      {}
    );
  }
};
