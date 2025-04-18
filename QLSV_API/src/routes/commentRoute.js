const express = require('express');
const {
    createCommentController,
    getCommentsByPostController,
    updateCommentController,
    deleteCommentController
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const commentRouter = express.Router();

commentRouter.post('/', authMiddleware, createCommentController);
commentRouter.get('/:postId', getCommentsByPostController);
commentRouter.put('/:commentId', authMiddleware, updateCommentController);
commentRouter.delete('/:commentId', authMiddleware, deleteCommentController);

module.exports = commentRouter;
