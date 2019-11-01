const Training = require('../../models/training.model');
const getTraining = require('./getTraining');
const { ObjectId } = require('mongoose').Types;

const updateBookReadCheck = (req, res) => {
  const trainingId = req.params.trainingId;
  const bookId = req.params.booksId;
  const updatedData = req.body;

  const sendError = error => {
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      message: errMessage,
      error: error
    });
  };
  console.log('updatedData', updatedData);
  Training.findByIdAndUpdate(
    trainingId,
    {
      $set: { 'books.$[elem].isRead': updatedData.isRead }
    },
    //  $inc: { unreadCount: updatedData.isRead ? -1 : 1 } }

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
