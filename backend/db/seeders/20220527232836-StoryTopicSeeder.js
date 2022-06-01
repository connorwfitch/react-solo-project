'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StoryTopics', [
      {
        storyId: 1,
        topicId: 5
      },
      {
        storyId: 2,
        topicId: 5
      },
      {
        storyId: 3,
        topicId: 3
      },
      {
        storyId: 3,
        topicId: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StoryTopics', null, {});
  }
};
