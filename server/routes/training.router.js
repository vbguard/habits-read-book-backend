const router = require('express').Router();

const {
  getTraining,
  updateTraining,
  deleteTraining,
  createTraining,
  addTrainingTime,
  deleteTrainingTime,
  checkReadBookTraining
} = require('../controllers/training');

router
  .get('/', getTraining)
  .patch('/:trainingId', updateTraining)
  .delete('/:trainingId', deleteTraining)
  .post('/', createTraining)
  .post('/:trainingId/time/:trainingId', addTrainingTime)
  .delete('/:trainingId/time/:trainingTimeId', deleteTrainingTime)
  .patch('/:trainingId/book/:bookId', checkReadBookTraining);

module.exports = router;
