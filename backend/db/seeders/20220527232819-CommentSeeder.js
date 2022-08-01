'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'Thank you, can\'t wait to try these out!',
        userId: 2,
        storyId: 1
      },
      {
        content: 'YUMMY!',
        userId: 3,
        storyId: 2
      },
      {
        content: 'Oh, so this is why Dutch kids are the happiest in the world!',
        userId: 1,
        storyId: 2
      },
      {
        content: 'Very interesting! I never knew about the origins of the name!',
        userId: 1,
        storyId: 3
      },
      {
        content: 'Can I hire the Dutch transit workers for my startup\'s UX team?',
        userId: 3,
        storyId: 4
      },
      {
        content: 'Putting my life savings into tulip stock options!',
        userId: 2,
        storyId: 5
      },
      {
        content: 'Three cheers for LGBTQ+ rights! Hip hip! Hooray!',
        userId: 3,
        storyId: 6
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
