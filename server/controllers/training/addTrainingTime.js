const Training = require('../../models/training.model');

const updateTraining = (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user.id;
  const updatedData = req.body;
  // console.log('updatedBook route');
  const sendResponse = books => {
    res.status(200);
    res.json({
      status: 'success',
      books
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      message: errMessage,
      error: error
    });
  };

  Training.findByIdAndUpdate(
    {
      _id: bookId,
      userId
    },
    {
      $push: {
        pagesReadResult: updateTraining
      }
    },
    {
      new: true
    }
  )
    .populate('books.book', { title: 1, author: 1, year: 1, pagesCount: 1 })
    .then(result => {
      // console.log('result', result);
      sendResponse(result);
    })
    .catch(err => sendError(err));
};

module.exports = updateTraining;
