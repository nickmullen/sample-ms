"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("books", [{ id: "d240ddc0-60a5-4028-9da6-d7339c631976", author: "James Joyce" }]);
    await queryInterface.bulkInsert("translations", [
      {
        id: "0f65e20b-8f3d-42ad-8bcc-e291eb463188",
        recordId: "d240ddc0-60a5-4028-9da6-d7339c631976",
        recordType: "book",
        key: "name",
        language: "en",
        value: "Ulysses"
      },
      {
        id: "106cc7f1-3147-4c80-a21a-35fe64b90314",
        recordId: "d240ddc0-60a5-4028-9da6-d7339c631976",
        recordType: "book",
        key: "name",
        language: "fr",
        value: "Ulysse"
      },
      {
        id: "1071f71e-4e06-468b-ae85-9d9b3a00e54b",
        recordId: "d240ddc0-60a5-4028-9da6-d7339c631976",
        recordType: "book",
        key: "description",
        language: "en",
        value: "Ulysses is a modernist novel by the Irish writer James Joyce."
      },
      {
        id: "16586087-0594-4494-ba04-caedbf6dfb15",
        recordId: "d240ddc0-60a5-4028-9da6-d7339c631976",
        recordType: "book",
        key: "description",
        language: "fr",
        value: "Ulysse (titre original Ulysses en anglais) est un roman de James Joyce."
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
      "books",
      {
        id: ["d240ddc0-60a5-4028-9da6-d7339c631976"]
      },
      {}
    );

    await queryInterface.bulkDelete(
      "translations",
      {
        recordId: ["d240ddc0-60a5-4028-9da6-d7339c631976"]
      },
      {}
    );
  }
};
