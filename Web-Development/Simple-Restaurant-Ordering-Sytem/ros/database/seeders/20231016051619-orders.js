'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "orders",
  [    
    { 
      id: "321",
      quantity: 25,
      table_number : 1,
      menu_id : "1874",
      createdAt : new Date(),
      updatedAt : new Date(),
    },

    {
      id: "322",
      quantity: 23,
      table_number : 2,
      menu_id : "1431",
      createdAt : new Date(),
      updatedAt : new Date(),
    },
    {
      id: "323",
      quantity: 12,
      table_number : 3,
      menu_id : "5132",
      createdAt : new Date(),
      updatedAt : new Date(),
    }
  ],
    {}
  );
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
