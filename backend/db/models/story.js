'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    headerImgUrl: DataTypes.TEXT,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.User, { foreignKey: 'userId' });
    Story.belongsToMany(models.User, {
      through: 'Comment',
      foreignKey: 'storyId',
      otherKey: 'userId'
    });
  };
  return Story;
};