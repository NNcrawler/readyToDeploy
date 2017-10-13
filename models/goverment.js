'use strict';
module.exports = (sequelize, DataTypes) => {
  var Goverment = sequelize.define('Goverment', {
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Goverment.associate = function (models) {
    Goverment.hasMany(models.Issue);
    Goverment.belongsTo(models.User);
  };
  return Goverment;
};
