const Training = require('../../models/training.model');
const ObjId = require('mongoose').Types.ObjectId;
const Books = require('../../models/books.model');

const getTraining = (req, res) => {
  const userId = req.user.id;
  const haveTraining = req.user.haveTraining;

  const sendResponse = training => {
    if (haveTraining)
      return res.status(200).json({
        status: 'OK',
        training: training[0] || [],
        userData: {
          haveTraining: haveTraining
        }
      });

    res.status(200).json({
      status: 'OK',
      training: training[0] || []
    });
  };

  const sendError = error => {
    const errMessage = error.message || 'must handle this error get Training';
    res.status(400).json({
      status: 'error',
      error: error,
      message: errMessage
    });
  };

  // Training.find({
  //   userId,
  //   isDone: false
  // })
  // .populate('books.book', { title: 1, author: 1, year: 1, pagesCount: 1 })
  //   .project({ 'books.book.__v': 0 })
  //   .limit(1)
  //   .select({ __v: 0, createdAt: 0, updatedAt: 0 })
  //   .then(result => sendResponse(result[0]))
  //   .catch(err => sendError(err));

  Training.aggregate([
    { $match: { isDone: false, userId: ObjId(userId) } },
    {
      $unwind: '$books'
    },
    {
      $lookup: {
        from: Books.collection.name,
        let: { bookId: '$books.book' },
        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$bookId'] } } }],
        as: 'books.book'
      }
    },
    { $limit: 1 },
    {
      $addFields: {
        allPagesCount: { $sum: '$books.book.pagesCount' },
        userRead: { $sum: '$pagesReadResult.count' }
      }
    },
    {
      $project: {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        'books.book.__v': 0,
        'books.book.userId': 0,
        'books.book.createdAt': 0,
        'books.book.updatedAt': 0,
        'books.book.status': 0
      }
    }
  ])
    .then(result => sendResponse(result))
    .catch(err => sendError(err));
};

module.exports = getTraining;
