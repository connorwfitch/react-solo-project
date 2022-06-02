// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Comment, Story, User, Like } = require('../../db/models');

const router = express.Router();

/*
-------------------ROUTES-------------------
*/

// POST /api/comments (create a comment)
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { content, userId, storyId } = req.body;
  const comment = await Comment.create({ content, userId, storyId });

  const story = await Story.findByPk(storyId, {
    // QUESTION: 'Like is not associated to Story!'
    include: [
      User,
      {
        model: Comment,
        include: User
      }
    ]
  });

  // We return the entire story because the comments are nested in the story slice of state
  return res.json({
    story
  });
}));

// PATCH /api/comments/:commentId (update a comment)
router.patch('/:commentId', requireAuth, asyncHandler(async (req, res) => {
  const { content } = req.body;
  const commentId = parseInt(req.params.commentId, 10);
  const comment = await Comment.findByPk(commentId);

  await comment.update({ content });

  const storyId = comment.storyId;
  const story = await Story.findByPk(storyId, {
    // QUESTION: 'Like is not associated to Story!'
    include: [
      User,
      {
        model: Comment,
        include: User
      }
    ]
  });

  // We return the entire story because the comments are nested in the story slice of state
  return res.json({
    story
  });
}));

// DELETE /api/comments/:commentId (delete a comment)
router.delete('/:commentId', requireAuth, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);
  const comment = await Comment.findByPk(commentId);
  const storyId = comment.storyId;

  await comment.destroy();

  const story = await Story.findByPk(storyId, {
    // QUESTION: 'Like is not associated to Story!'
    include: [
      User,
      {
        model: Comment,
        include: User
      }
    ]
  });

  // We return the entire story because the comments are nested in the story slice of state
  return res.json({
    story
  });
}));

module.exports = router;