// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

// TODO: validators?

/*
-------------------ROUTES-------------------
*/

// POST /api/comments (create a comment)
// QUESTION: requireAuth?
// TODO: validators
router.post('/', asyncHandler(async (req, res) => {
  const { content, userId, storyId } = req.body;
  const comment = await Comment.create({ content, userId, storyId });

  return res.json({
    comment
  });
}));

// PATCH /api/comments/:commentId (update a comment)
// QUESTION: requireAuth?
// TODO: validators
router.patch('/:commentId', asyncHandler(async (req, res) => {
  const { content } = req.body;
  const commentId = parseInt(req.params.commentId, 10);
  const comment = await Comment.findByPk(commentId);

  await comment.update({ content });

  return res.json({
    comment
  });
}));

// DELETE /api/comments/:commentId (delete a comment)
// QUESTION: requireAuth?
router.delete('/:commentId', asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10);
  const comment = await Comment.findByPk(commentId);

  await comment.destroy();

  return res.json({
    message: 'Success'
  });
}));

module.exports = router;