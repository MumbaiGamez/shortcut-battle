import { Router } from 'express';

import * as postsController from '../controllers/posts';
import * as commentsController from '../controllers/comments';
import {
  validateComment,
  validatePost,
  validateUser,
} from '../middlewares/validator';

import { comment, post } from '../@types/api';

const forumRouter = Router();

forumRouter.get(post.index, postsController.getAllPosts);
forumRouter.get(post.byId, postsController.getPost);
forumRouter.get(post.comments, postsController.getPostComments);
forumRouter.post(
  post.index,
  validateUser,
  validatePost,
  postsController.createPost
);

forumRouter.get(comment.byId, commentsController.getComment);
forumRouter.post(
  comment.index,
  validateUser,
  validateComment,
  commentsController.createComment
);

export default forumRouter;
