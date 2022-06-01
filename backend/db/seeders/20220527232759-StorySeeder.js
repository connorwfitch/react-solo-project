'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      {
        title: 'City Walkability to Address Health Inequality',
        headerImgUrl: 'http://www.goodnet.org/photos/620x0/30746_hd.jpg',
        content: 'One of the many benefits of walkable communities is the intrinsic exercise that you get each day. Those little bits of walking or biking around that you do in your day-to-day life such as picking up groceries or meeting a friend for coffee really add up.\nFurther, while you certainly can mitigate the adverse health consequences of the sedentary life that car-dependent infrastructure imposes, doing so is largely facilitated by access to money. In a Stanford study from 2017, researchers found that not only was there a negative correlation between city walkability and obesity, but also that those health benefits were largely felt by those with lower incomes, leading the researchers to use the term "activity inequality" to describe how car-dependency disproportionately impacts those with the least in our society.',
        userId: 1,
      },
      {
        title: 'Delight per Acre',
        headerImgUrl: 'https://images.squarespace-cdn.com/content/v1/53dd6676e4b0fedfbc26ea91/1626821457910-7D6JETZ5NDQ4XL0EF5WN/1024px-Shambles_shopper_8686.jpg?format=2500w',
        content: 'Some of the most delightful urban spaces are also some of the smallest, and it is a seemingly-counterintuitive observation that we should more deeply consider. This is true of both public and private space. Think of the most charming, appealing spaces you have ever spent time in: gardens, patios, courtyards, alleyways, or pedestrian streets. I would hazard a guess that these spaces are more intimate than expansive.\nThe reason behind this is twofold. First is simply that spaces scaled to our physical bodies are more comfortable, providing a sense of enclosure and security. Wide open spaces without defining edges can be ovewhelming and alienating.\nThe other reason has to do with our capacity for attention. When you\'re designing a small space, you are more likely to consider every detail and every inch, but on larger scales this attention to detail becomes unsustainable, leaving us with large, nondescript lawns and oversized superstore parking lots.\nNot to mention that these smaller places are safer and more likely to be financially solvent! (See other articles for more.)',
        userId: 2,
      },
      {
        title: 'Dutch Children are the Happiest',
        headerImgUrl: 'https://www.treehugger.com/thmb/B_7ESXAkjKZ8qAUWw_jcBygq5CY=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__treehugger__images__2017__01__Dutch_kids_playing_outside-541eaaffe8894ef7960fd78a18372615.jpg',
        content: 'In 2013, Unicef released a report card that assessed children\'s wellbeing in 29 of the richest countries. Based on the criteria of material wellbeing, health and safety, education, behaviors and risks, and housing and environment, the study concluded that Dutch children are the happiest.\nOne of the obvious factors is education. The Dutch education system imposes less pressure on students to meet standards by specific dates; if a child is slow to read, they are not shamed for failing to meet the goal but encouraged that they will get the hang of it soon enough.\nThere are also more subtle factors, such as increased independence. Due to the car-dependent infrasturucture, children in the United States must be driven around by their parents to get anywhere. Contrast this with the Netherlands where the children are able to safely bike to and from school, friends\' houses, sports, and other activities all on their own! Oh, and they also get to eat Hagelslag of course!',
        userId: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
