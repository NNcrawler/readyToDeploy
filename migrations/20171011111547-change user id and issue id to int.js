'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Responds').then(()=>{
      return queryInterface.createTable('Responds', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        IssueId: {
          type: Sequelize.INTEGER
        },
        UserId: {
          type: Sequelize.INTEGER
        },
        respond: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    })
    ;
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
