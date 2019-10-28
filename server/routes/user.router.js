const router = require('express').Router();
const passport = require('passport');

const {
  restorePassword,
  updateUser,
  deleteUser,
  getUser,
  getUsers
} = require('../controllers/user');

const passportCheck = passport.authenticate('jwt', {
  session: false
});

router
  .get('/users', getUsers)
  .get('/me', passportCheck, getUser)
  .delete('/', passportCheck, deleteUser)
  .put('/', passportCheck, updateUser)
  .post('/restore', restorePassword);

module.exports = router;
