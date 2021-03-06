// External modules
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

// Internal modules
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story } = require('../../db/models');
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
  check('email')
    .custom((value) => {
      return User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided email is already in use by another user.');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a username that is between 3 and 30 characters long.')
    .isLength({ max: 30 })
    .withMessage('Please provide a username that is between 3 and 30 characters long.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('username')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another user.');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validatePatch = [
  // will need to be different from above to check uniqueness agianst others but not self
];

/*
-------------------ROUTES-------------------
*/
// POST /api/users (signup, create a user profile)
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));

// GET /api/users (get all users)
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();

  return res.json({
    users
  });
}));

// GET /api/users/:userId (read a user profile)
router.get('/:userId', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId, {
    include: Story
  });

  return res.json({
    user
  });
}));

// PATCH /api/users/:userId (update a user profile)
// QUESTION: requireAuth?
router.patch('/:userId', validatePatch, asyncHandler(async (req, res) => {
  // QUESTION: Offer password update?
  const { email, username, bio, profileImgUrl } = req.body;
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId);

  await user.update({ email, username, bio, profileImgUrl });

  // QUESTION: I think I need to reset the cookie, right?
  await setTokenCookie(res, user);

  return res.json({
    user
  });
}));

// DELETE /api/users/:userId (delete a user profile)
// QUESTION: requireAuth?
router.delete('/:userId', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = await User.findByPk(userId);
  await user.destroy();

  res.json({
    message: 'Success'
  });
}));

module.exports = router;