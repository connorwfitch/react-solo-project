// External modules
const express = require('express');

// Internal modules
const apiRouter = require('./api');

// Base router
const router = express.Router();

// API router
router.use('/api', apiRouter);

module.exports = router;