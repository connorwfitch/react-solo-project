// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');

// Internal modules
const { requireAuth } = require('../../utils/auth');
const { Topic, Story } = require('../../db/models');

const router = express.Router();

/*
-------------------ROUTES-------------------
*/

// GET /api/topics (get all topics)
router.get('/', asyncHandler(async (req, res) => {
  const topics = await Topic.findAll();

  return res.json({
    topics
  });
}));

// GET /api/topics/:topicId
router.get('/:topicId', asyncHandler(async (req, res) => {
  const topicId = parseInt(req.params.topicId, 10);
  const topic = await Topic.findByPk(topicId, {
    include: Story
  });

  return res.json({
    topic
  });
}));

module.exports = router;