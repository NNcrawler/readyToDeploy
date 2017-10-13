'use strict';
const voter = require('../helpers/voter');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate = function (models) {
    User.belongsToMany(models.Issue, {through:models.Respond});
    User.hasMany(models.Respond);
    User.hasMany(models.VoteIssue);
    User.hasOne(models.Goverment);
  };

  User.prototype.voteIssue = function(issue_id, vote, VoteIssue, Issue){
    return voter(this.id, issue_id, vote, VoteIssue, Issue, 'issue');
  };

  User.prototype.voteRespond = function(respond_id, vote, VoteRespond, Respond){
    return voter(this.id, respond_id, vote, VoteRespond, Respond, 'respond')

  }

  return User;
};
