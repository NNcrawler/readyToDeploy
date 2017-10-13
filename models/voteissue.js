'use strict';
const models = require('../models');
module.exports = (sequelize, DataTypes) => {
  var VoteIssue = sequelize.define('VoteIssue', {
    IssueId: DataTypes.INTEGER,
    isVoteUp: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  VoteIssue.associate = function(models) {
    // VoteIssue.hasMany(models.Issue)
  }
  return VoteIssue;
};
