'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    photo: DataTypes.STRING,
    bin: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    restaurantId: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};
