const Joi = require('joi');
const { ValidationError } = require('../../core/error');
const Training = require('../../models/training.model');

const createTraining = (req, res) => {
  const userId = req.user.id;
  const schema = Joi.object()
    .keys({
      books: Joi.array().items(
        Joi.object().keys({
          book: Joi.string().required()
        })
      ),
      timeEnd: Joi.date().required(),
      timeStart: Joi.date().required(),
      pagesCount: Joi.number()
        .required()
        .integer()
        .required(),
      avgReadPages: Joi.number().required()
    })
    .options({
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) throw new ValidationError(result.error.message);

  const sendResponse = training => {
    res.status(201);
    res.json({
      status: 'success',
      training
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      error: errMessage
    });
  };

  const newTraining = new Training({
    ...result.value,
    userId
  });

  newTraining
    .save()
    .then(result => sendResponse(result))
    .catch(err => sendError(err));
};

module.exports = createTraining;