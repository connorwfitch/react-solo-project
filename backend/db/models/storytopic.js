'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryTopic = sequelize.define('StoryTopic', {
    topicId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  StoryTopic.associate = function(models) {
    // associations can be defined here
  };
  return StoryTopic;
};