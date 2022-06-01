// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { User, Story, Comment, Like } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/

const validateStory = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a title that is between 3 and 256 characters long.')
    .isLength({ min: 3 })
    .withMessage('Please provide a title that is between 3 and 256 characters long.')
    .isLength({ max: 256 })
    .withMessage('Please provide a title that is between 3 and 256 characters long.'),
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide content for your story.'),
  handleValidationErrors
]

/*
-------------------ROUTES-------------------
*/
// POST /api/stories (create a story)
router.post('/', requireAuth, validateStory, asyncHandler(async (req, res) => {
  const { title, headerImgUrl, content, userId } = req.body;
  if(headerImgUrl) {
    await Story.create({title, headerImgUrl, content, userId});
  } else {
    await Story.create({ title, content, userId });
  }

  const story = await Story.findByPk(userId, {include: User});
  return res.json({
    story
  });
}));


// GET /api/stories (get all stories)
router.get('/', asyncHandler(async (req, res) => {
  const stories = await Story.findAll({ include: User });

  return res.json({
    stories
  });
}));

// GET /api/stories/:storyId (read a story)
router.get('/:storyId', asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId, {
    // QUESTION: 'Like is not associated to Story!'
    include: [User, Comment]
  });

  return res.json({
    story
  });
}));

// PATCH /api/stories/:storyId (update a story)
router.patch('/:storyId', requireAuth, validateStory, asyncHandler(async (req, res) => {
  const { title, headerImgUrl, content } = req.body;
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId, { include: User });

  await story.update({ title, headerImgUrl, content });

  return res.json({
    story
  });
}));

// DELETE /api/stories/:storyId (delete a story)
router.delete('/:storyId', requireAuth, asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.storyId, 10);
  const story = await Story.findByPk(storyId);

  await story.destroy();

  res.json({
    message: 'Success'
  });
}));

module.exports = router;