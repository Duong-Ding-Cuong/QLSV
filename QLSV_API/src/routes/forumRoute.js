const express = require('express');
const {
    createForumController,
    getAllForumController,
    updateForumController,
    softDeleteForumController,
    hardDeleteForumController
} = require('../controllers/forumController');
const authMiddleware = require('../middleware/auth');

const forumRouter = express.Router();

forumRouter.post('/topics', authMiddleware, createForumController);
forumRouter.get('/topics', getAllForumController);
forumRouter.put('/topics/:id', authMiddleware, updateForumController);
forumRouter.delete('/topics/:id', authMiddleware, softDeleteForumController);
forumRouter.delete('/topics/hard/:id', authMiddleware, hardDeleteForumController);

module.exports = forumRouter;
