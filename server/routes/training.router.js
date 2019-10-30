const router = require('express').Router();

const {
  getTraining,
  updateTraining,
  deleteTraining,
  createTraining
} = require('../controllers/training');

router
  .get('/', getTraining)
  .patch('/:trainingId', updateTraining)
  .delete('/:trainingId', deleteTraining)
  .post('/', createTraining);

module.exports = router;
