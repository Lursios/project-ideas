'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "menus",
    [    
      { 
        menuName:	"Nasi Goreng Spesial" ,
        menuPrice: "25,000"  ,
        createdAt : new Date(),
        updatedAt : new Date(),
      },

      {
          menuName: "Mie Ayam" ,
          menuPrice: "13,000"  ,
          createdAt : new Date(),
          updatedAt : new Date(),
      },
      {
          menuName: "Ketoprak",
          menuPrice: "15,000"  ,
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
