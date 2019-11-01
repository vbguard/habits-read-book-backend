const Training = require('../../models/training.model');
const getTraining = require('./getTraining');

const updateBookReadCheck = (req, res) => {
  const trainingId = req.params.trainingId;
  const userId = req.user.id;
  const updatedData = req.body;
  // console.log('updatedBook route');
  // const sendResponse = training => {
  //   res.status(200);
  //   res.json({
  //     status: 'success',
  //     training
  //   });
  // };

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
      $set: {
        ...updatedData
      }
    },
    {
      new: true
    }
  )
    .then(result => {
      // console.log('result', result);
      if (result) getTraining(req, res);
    })
    .catch(err => sendError(err));
};

module.exports = updateBookReadCheck;
