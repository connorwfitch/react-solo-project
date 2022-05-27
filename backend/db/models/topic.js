'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    Topic.belongsToMany(models.Story, {
      through: 'StoryTopic',
      foreignKey: 'topicId',
      otherKey: 'storyId'
    });
  };
  return Topic;
};