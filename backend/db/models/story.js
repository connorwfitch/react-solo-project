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
    Story.hasMany(models.Comment, { foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true });
    // Story.belongsToMany(models.User, {
    //   through: 'Like',
    //   foreignKey: 'storyId',
    //   otherKey: 'userId',
    //   as: 'userLike'
    // });
    Story.hasMany(models.Like, { foreignKey: 'storyId', onDelete: 'CASCADE', hooks: true });
  };
  return Story;
};