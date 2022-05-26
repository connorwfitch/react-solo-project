// External modules
const express = require('express');

// Internal modules



const router = express.Router();


/* 
-------------------ROUTES-------------------
*/
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;