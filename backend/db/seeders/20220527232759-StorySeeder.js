'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Stories', [
      {
        title: '8 Useful Dutch Greetings and 1 Super Greeting!',
        headerImgUrl: 'https://i0.wp.com/cms.babbel.news/wp-content/uploads/2017/12/Niederlaendisch-hallo-FB1200.png?resize=1200,630',
        content: '<p>Here are some useful phrases for saying "hi" and "bye" in Dutch!</p><ol><li>Goedemorgen - Good morning</li><li>Hallo - Hello</li><li>Hoi - Hi (more casual)</li><li>Goedenavond - Good evening</li><li>Goedenacht - Good night</li><li>Tot ziens - Goodbye</li><li>Tot straks - See you later (in the same day)</li><li>Tot zo - See you soon</li></ol><p>But if that\'s too much to remember, you can just use "dag"! It is a pretty flexible word, that literally translates to "day" but can be used as both a greeting and a farewell! Happy learning!</p>',
        userId: 1,
      },
      {
        title: 'Top Secret Hagelslag Recipe',
        headerImgUrl: 'https://globalreachconfections.com/wp-content/uploads/2021/01/p2iiX7R.jpg',
        content: '<p>Today, we\'re making Hagelslag, the famous Dutch breakfast treat! It\'s super easy and only requires 3 ingredients!</p><ol><li>Bread</li><li>Butter</li><li>Sprinkles</li></ol><p>If you want the most authentic way to make it, I would recommend De Ruijter chocolate sprinkles, but really just have fun with it and remember that moderation is key! :)</p>',
        userId: 2,
      },
      {
        title: 'What\'s with the Canals?',
        headerImgUrl: 'https://luxeadventuretraveler.com/wp-content/uploads/2013/06/Luxe-Adventure-Traveler-Amsterdam-Canals-Cruise-2.jpg',
        content: '<p>Amsterdam is famous for many things, including its network of beautiful canals, but how did this come about?</p><p>Amsterdam was originally founded in the 12th century as a fishing village. The village was named after the Amstel River and the dam that was built in 1220 to prevent floods. Amstel. Dam. Amsterdam.</p><p>Likewise, the first canals were dug for water management and defense from invaders. However as the city expanded, the moats quickly ended up <em>inside</em> the walls and lost their defensive function. That said, they soon gained a new one, as the canals became central to local trade and transportation.</p><p>Today, Amsterdam\'s 165 canals run for over 60 miles throughout the center of the city and are recognized as a UNESCO World Heritage Site. Be sure to check them out when you visit!</p>',
        userId: 3,
      },
      {
        title: 'The UX Brilliance of Dutch Public Transportation',
        headerImgUrl: 'https://images.squarespace-cdn.com/content/v1/5b44b71825bf022e2693f74a/1532100564794-XM7I596Q3R0MX3HP7XNZ/OV-chipkaart-Anoniem-Voorkant.jpg?format=1000w',
        content: '<p>The Netherlands is famous for its clean, efficient, and affordable public transit, but what you may not know is how their user experience design would put many of the top minds of Silicon Valley to shame!</p><p>In particular, I am talking about the OV-chipkaart; the OV-chipkaart is a smart-card payment system that operates across the country on <em>all</em> public transport options. Talk about a single sign on!</p><p>Further, there are a variety of ways that you can load up your OV-chipkaart. Beyond the standard offerings of monthly passes and student discounts, you can add funds to your card\'s balance at a ticket machine or online. Or better yet, you can sign up for automatic top-ups for when your balance falls below a certain amount. Truly seamless.</p >',
        userId: 1,
      },
      {
        title: 'Flower Power',
        headerImgUrl: 'https://i0.wp.com/www.trafalgar.com/real-word/wp-content/uploads/sites/3/2019/12/pink-tulip-field-netherlands.jpeg?w=1440&ssl=1',
        content: '<p>The Netherlands is known as "the flower shop of the world," and has truly earned that nickname. While the speculative bubble of the Dutch tulip market in the 1600\'s is an excellent case study in dubious economics, the Dutch have thankfully stabilized their flower market over the past 400 years.</p> <p>Nowadays, the Netherlands produces around 80% of the world\'s flower bulbs and the flower industry makes up over 5% of the Netherland\'s GDP, producing 4.3 billion tulip bulbs annually. Take a minute to stop and smell the tulips!</p>',
        userId: 1,
      },
      {
        title: 'Marriage Equality is No April Fool\'s Joke',
        headerImgUrl: 'https://www.benandjerry.com.au/files/live/sites/systemsite/files/whats-new/global-marriage-equality/netherlands-779.jpg',
        content: '<p>On April 1st of 2001, the Netherlands made history, becoming the first country in the world to legalize same-sex marriage. And it wasn\'t an April Fool\'s joke either!</p><p>To commemorate the momentous occasion, Job Cohen, the mayor of Amsterdam at the time, married four same-sex couples at midnight that day.</p>',
        userId: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Stories', null, {});
  }
};
