const Joi = require('joi');
const { ValidationError } = require('../../core/error');

const Books = require('../../models/books.model');

const addBook = (req, res) => {
  console.log('addBook route');
  const schema = Joi.object()
    .keys({
      title: Joi.string().required(),
      author: Joi.string(),
      year: Joi.number().integer(),
      pageNumber: Joi.number()
        .integer()
        .required(),
      readedPageNumber: Joi.number().integer(),
      comment: Joi.string(),
      rating: Joi.object()
        .keys({
          1: Joi.number().integer(),
          2: Joi.number().integer(),
          3: Joi.number().integer(),
          4: Joi.number().integer(),
          5: Joi.number().integer()
        })

        .xor(1, 2, 3, 4, 5),
      status: Joi.object()
        .keys({
          readed: Joi.number().integer(),
          planned: Joi.number().integer(),
          inReading: Joi.number().integer()
        })

        .xor('readed', 'planned', 'inReading'),
      userId: Joi.string().required()
    })
    .options({
      presence: 'required',
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) throw new ValidationError(result.error.message);

  const sendResponse = book => {
    res.status(201);
    res.json({
      status: 'success',
      book
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle this error on login';
    res.status(400).json({
      status: 'error',
      error: errMessage
    });
  };

  const newBook = new Books(result.value);

  newBook
    .save()
    .then(result => sendResponse(result))
    .catch(err => sendError(err));
};

module.exports = addBook;

/*
{
  "title": "Bim",
  "author": "Bom",
  "year": 2000,
  "pageNumber": "200",
  "readedPageNumber": "200",
  "comment": "comment",
  "rating": "10",
  "status": "planned",
  "userId": "5db366eab9db601800ebf8a4",
}
*/
