const router = require('express').Router();
const passport = require('passport');

const passportCheck = passport.authenticate('jwt', {
  session: false
});

const {
  addBook,
  getBooks,
  deleteBook,
  updatedBook
} = require('../controllers/books');

router
  .get('/', passportCheck, getBooks)
  .post('/create', passportCheck, addBook)
  .delete('/:bookId', passportCheck, deleteBook)
  .patch('/:bookId', passportCheck, updatedBook);

module.exports = router;
