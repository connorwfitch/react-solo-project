// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Like, Story, User, Comment } = require('../../db/models');

const router = express.Router();

/*
-------------------ROUTES-------------------
*/

// POST /api/likes (create a like)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { userId, storyId } = req.body;
  const like = await Like.create({ userId, storyId });

  const story = await Story.findByPk(storyId, {
    include: [
      User,
      {
        model: Comment,
        include: User
      },
      {
        model: User,
        as: 'userLike'
      }
    ]
  })

  return res.json({
    story
  });
}));

// DELETE /api/likes/:likeId (delete a like)
router.delete('/:likeId', requireAuth, asyncHandler(async (req, res) => {
  const likeId = parseInt(req.params.likeId, 10);
  const like = await Like.findByPk(likeId);
  const storyId = like.storyId;

  await like.destroy();

  const story = await Story.findByPk(storyId, {
    include: [
      User,
      {
        model: Comment,
        include: User
      },
      {
        model: User,
        as: 'userLike'
      }
    ]
  });

  return res.json({
    story
  });
}));

module.exports = router;