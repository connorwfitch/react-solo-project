// External modules
const express = require('express');
// const asyncHandler = require('express-async-handler');

// Internal modules
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');



const router = express.Router();


/* 
-------------------ROUTES-------------------
*/
router.use('/session', sessionRouter);

router.use('/users', usersRouter);


module.exports = router;