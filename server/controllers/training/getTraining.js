const Training = require('../../models/training.model');

const getTraining = (req, res) => {
  const userId = req.user.id;

  const sendResponse = training => {
    res.status(200);
    res.json({
      status: 'OK',
      training
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle this error get Training';
    res.status(400).json({
      status: 'error',
      error: error,
      message: errMessage
    });
  };

  Training.find({
    userId
  })
    .populate('books.book', { title: 1, author: 1, year: 1, pagesCount: 1 })
    .then(result => sendResponse(result))
    .catch(err => sendError(err));
};

module.exports = getTraining;
