// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

/*
-------------------VALIDATORS-------------------
*/
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validatePatch = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

/*
-------------------ROUTES-------------------
*/
// POST /api/users (signup)
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));

// GET /api/users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();

  return res.json({
    users
  });
}));

// GET /api/users/:userId
router.get('/:userId', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId);

  return res.json({
    user
  });
}));

// DELETE /api/users/:userId
router.delete('/:userId', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId);
  await user.destroy();

  res.json({ 
    message: 'Success'
  });
}));

// PATCH /api/users/:userId (edit)
router.post('/', validatePatch, asyncHandler(async (req, res) => {
  // QUESTION: Offer password update?
  const { email, username, bio, profileImgUrl } = req.body;
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId);

  // QUESTION: Can I spread this from req.body instead?
  await user.update({ email, username, bio, profileImgUrl });

  // QUESTION: I think I need to reset the cookie?
  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));

module.exports = router;