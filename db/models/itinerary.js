'use strict';
module.exports = (sequelize, DataTypes) => {
  var Itinerary = sequelize.define('Itinerary', {
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT
  });

  Itinerary.associate = function (models) {
    Itinerary.belongsTo(models.User);
    Itinerary.hasMany(models.Activity);
  };

  return Itinerary;
};
