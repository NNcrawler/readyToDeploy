'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      GovermentId: DataTypes.STRING,
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
    */
    return queryInterface.bulkInsert('Issues', [{
        GovermentId: '11',
        title: 'Angkutan Umum',
        detail: 'Peremajaan Angkutan Umum',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        GovermentId: '11',
        title: 'JavaScript behavior',
        detail: 'Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
