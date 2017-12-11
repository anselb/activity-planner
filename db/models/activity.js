'use strict';
module.exports = (sequelize, DataTypes) => {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    activityUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    price: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsTo(models.Itinerary);
      }
    }
  });
  return Activity;
};
