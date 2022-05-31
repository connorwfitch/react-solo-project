'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Topics', [
      {
        name: 'Public Transit'
      },
      {
        name: 'Dutch Language'
      },
      {
        name: 'Dutch Culture'
      },
      {
        name: 'Biking'
      },
      {
        name: 'Urban Design'
      },
      {
        name: 'Climate Policy'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Topics', null, {});
  }
};
