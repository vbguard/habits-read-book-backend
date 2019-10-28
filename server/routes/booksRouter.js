const router = require('express').Router();
const passport = require('passport');

const passportCheck = passport.authenticate('jwt', {
  session: false
});

const {
  addBook,
  getBooks
} = require('../controllers/books');

router.get('/', getBooks).post('/add', passportCheck, addBook);
// .delete('/', passportCheck, deleteUser)
// .put('/', passportCheck, updateUser)
// .post('/restore', restorePassword);

module.exports = router;
