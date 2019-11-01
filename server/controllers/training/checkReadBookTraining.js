const Training = require('../../models/training.model');
const getTraining = require('./getTraining');

const updateBookReadCheck = (req, res) => {
  const trainingId = req.params.trainingId;
  const bookId = req.params.booksId;
  const userId = req.user.id;
  const updatedData = req.body;

  const sendError = error => {
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      message: errMessage,
      error: error
    });
  };

  Training.findOneAndUpdate(
    {
      _id: trainingId,
      userId
    },
    {
      $set: { 'books.$[elem].isRead': updatedData.isDone },
      $inc: { unreadCount: updatedData.isDone ? -1 : 1 }
    },
    {
      multi: true,
      arrayFilters: [{ 'elem._id': bookId }]
    }
  )
    .then(result => {
      console.log('result', result);

      if (result) getTraining(req, res);
    })
    .catch(err => sendError(err));
};

module.exports = updateBookReadCheck;
