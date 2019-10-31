const Training = require('../../models/training.model');

const deleteTraining = (req, res) => {
  const userId = req.user.id;
  const trainingTimeId = req.params.trainingTimeId;

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

  Training.findOneAndUpdate(
    { 'pagesReadResult._id': trainingTimeId, userId },
    { $pull: { 'pagesReadResult._id': trainingTimeId } }
  )
    .then(result => {
      sendResponse(result);
    })
    .catch(err => sendError(err));
};

module.exports = deleteTraining;
