const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

//use addComment as a POST callback to /api/comments/:pizzaId
router
    .route('/:pizzaId')
    .post(addComment);

//use removeComment as a DELETE callback to /api/comments/:pizzaId/:commentId
router
    .route('/:pizzaId/:commentId')
    .delete(removeComment);

module.exports = router;