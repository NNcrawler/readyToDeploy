'use strict';
module.exports = (sequelize, DataTypes) => {
  var VoteRespond = sequelize.define('VoteRespond', {
    RespondId: DataTypes.INTEGER,
    isVoteUp: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return VoteRespond;
};
