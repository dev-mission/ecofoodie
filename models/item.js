'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    photo: DataTypes.STRING,
    bin: DataTypes.INTEGER,
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsTo(models.Category);
    Item.belongsTo(models.Restaurant);
  };
  return Item;
};
