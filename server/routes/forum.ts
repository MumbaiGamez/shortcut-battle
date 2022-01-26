import { Router } from 'express';

import * as postsController from '../controllers/posts';
import * as commentsController from '../controllers/comments';
import {
  validateComment,
  validatePost,
  validateUser,
} from '../middlewares/validator';

const forumRouter = Router();

forumRouter.get('/posts', postsController.getAllPosts);
forumRouter.get('/posts/:id', postsController.getPost);
forumRouter.get('/posts/:id/comments', postsController.getPostComments);
forumRouter.post(
  '/posts',
  validateUser,
  validatePost,
  postsController.createPost
);

forumRouter.get('/comments/:id', commentsController.getComment);
forumRouter.post(
  '/comments',
  validateUser,
  validateComment,
  commentsController.createComment
);

export default forumRouter;
