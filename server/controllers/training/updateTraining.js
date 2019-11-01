const Training = require('../../models/training.model');
const getTraining = require('./getTraining');
const User = require('../../models/user.model');

const updateTraining = (req, res) => {
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
      const { isDone } = updatedData;
      if (isDone && isDone === true) {
        User.findByIdAndUpdate(userId, { $set: { haveTraining: false } });
        const booksIds = [];
        console.log('fasfa');
      }

      // console.log('result', result);
      if (result) getTraining(req, res);
    })
    .catch(err => sendError(err));
};

module.exports = updateTraining;
