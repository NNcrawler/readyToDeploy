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
    */
    return queryInterface.bulkInsert('Responds', [{
        IssueId: '3',
        UserId: '11',
        respond: 'okelah kalau begitu ulululululu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        IssueId: '3',
        UserId: '10',
        respond: 'okeokeokeoekoeke',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
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
