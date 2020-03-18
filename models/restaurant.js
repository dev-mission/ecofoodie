'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    logo: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.hasMany(models.Item);
  };
  return Restaurant;
};
