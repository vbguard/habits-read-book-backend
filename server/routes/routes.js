const router = require('express').Router();
// const passport = require('passport');

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const booksRouter = require('./booksRouter');

// If you want check user auth uncoment
// const passportCheck = passport.authenticate('jwt', {
//   session: false
// });

router
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/books', booksRouter)

module.exports = router;
