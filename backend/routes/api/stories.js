// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Story, Comment, Like } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

// TODO: validators

/*
-------------------ROUTES-------------------
*/
// POST /api/stories (create a story)
// QUESTION: requireAuth?
// TODO: validators
router.post('/', asyncHandler(async (req, res) => {
  const { title, headerImgUrl, content } = req.body;
  const story = Story.create({title, headerImgUrl, content});

  return res.json({
    story
  });
}));


// GET /api/stories (get all stories)
router.get('/', asyncHandler(async (req, res) => {
  const stories = await Story.findAll();

  return res.json({
    stories
  });
}));

// GET /api/stories/:storyId (read a story)
router.get('/:storyId', asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId, {
    include: [Comment, Like]
  });

  return res.json({
    story
  });
}));

// PATCH /api/stories/:storyId (update a story)
// QUESTION: requireAuth?
// TODO: validators
router.patch('/:storyId', asyncHandler(async (req, res) => {
  const { title, headerImgUrl, content } = req.body;
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId);

  await story.update({ title, headerImgUrl, content });

  return res.json({
    story
  });
}));

// DELETE /api/stories/:storyId (delete a story)
// QUESTION: requireAuth?
router.delete('/:storyId', asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId);

  await story.destroy();

  res.json({
    message: 'Success'
  });
}));

module.exports = router;