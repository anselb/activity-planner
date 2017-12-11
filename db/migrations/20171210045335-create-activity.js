'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ItineraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Itineraries',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      name: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      activityUrl: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.DATE
      },
      endTime: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Activities');
  }
};
