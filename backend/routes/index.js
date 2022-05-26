// External modules
const express = require('express');

// Internal modules
const apiRouter = require('./api');

// Base router
const router = express.Router();

// API router
router.use('/api', apiRouter);

router.get('/hello/world', function (req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;