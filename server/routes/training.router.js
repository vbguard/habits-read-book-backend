const router = require('express').Router();

const {
  getTraining,
  updateTraining,
  deleteTraining,
  createTraining,
  addTrainingTime,
  deleteTrainingTime
} = require('../controllers/training');

router
  .get('/', getTraining)
  .patch('/:trainingId', updateTraining)
  .delete('/:trainingId', deleteTraining)
  .post('/', createTraining)
  .post('/time/:trainingId', addTrainingTime)
  .delete('/time/:trainingTimeId', deleteTrainingTime);

module.exports = router;
