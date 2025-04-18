const express = require("express");

const authMiddleware = require("../middleware/auth");
const { createPostController, getPostsController, getPostByIdController, updatePostController, deletePostController } = require("../controllers/postController");
const { postUploadSingleFileAPI, postUploadMultipleFileAPI, getImageAPI } = require("../controllers/fileController");
const path = require("path");

const postRouter = express.Router();
postRouter.use('/images', express.static(path.join(__dirname, 'public/images')));
postRouter.post('/file', postUploadSingleFileAPI);
postRouter.post('/files', postUploadMultipleFileAPI);
postRouter.get('/images/:imageName', getImageAPI);
postRouter.post("/", authMiddleware, createPostController);
postRouter.get("/", getPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", authMiddleware, updatePostController);
postRouter.delete("/:id", authMiddleware, deletePostController);

module.exports = postRouter;
