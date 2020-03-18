'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction(function(transaction) {
      return queryInterface.removeColumn("Items", "categoryId", {transaction})
        .then(() => queryInterface.removeColumn("Items", "restaurantId", {transaction}))
        .then(() => queryInterface.addColumn("Items", "CategoryId", {
            type: Sequelize.INTEGER,
            references: {
              model: "Categories",
              key: "id"
            }
          }, {transaction}))
        .then(() => queryInterface.addColumn("Items", "RestaurantId", {
            type: Sequelize.INTEGER,
            references: {
              model: "Restaurants",
              key: "id"
            }
          }, {transaction}));
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.sequelize.transaction(function(transaction) {
      return queryInterface.removeColumn("Items", "CategoryId", {transaction})
        .then(() => queryInterface.removeColumn("Items", "RestaurantId", {transaction}))
        .then(() => queryInterface.addColumn("Items", "categoryId", {
            type: Sequelize.INTEGER,
          }, {transaction}))
        .then(() => queryInterface.addColumn("Items", "restaurantId", {
            type: Sequelize.INTEGER,
          }, {transaction}));
    });
  }
};
