// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');

// Internal modules
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();


/*
-------------------ROUTES-------------------
*/
// POST /api/users (signup)
router.post('/', asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));


module.exports = router;