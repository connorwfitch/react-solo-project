// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Like } = require('../../db/models');

const router = express.Router();

/*
-------------------ROUTES-------------------
*/

// POST /api/likes (create a like)
// QUESTION: requireAuth?
router.post('/', asyncHandler(async (req, res) => {
  const { userId, storyId } = req.body;
  const like = await Like.create({ userId, storyId });

  return res.json({
    like
  });
}));

// DELETE /api/likes/:likeId (delete a like)
// QUESTION: requireAuth?
router.delete('/:likeId', asyncHandler(async (req, res) => {
  const likeId = parseInt(req.params.likeId, 10);
  const like = await Like.findByPk(likeId);

  await like.destroy();

  return res.json({
    message: 'Success'
  });
}));

module.exports = router;