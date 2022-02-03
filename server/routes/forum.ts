import { Router } from 'express';

import * as postsController from '../controllers/posts';
import * as commentsController from '../controllers/comments';
import {
  validateComment,
  validatePost,
  validateUser,
} from '../middlewares/validator';

import { CommentAPI, PostAPI } from '../@types/api';

const forumRouter = Router();

forumRouter.get(PostAPI.root, postsController.getAllPosts);
forumRouter.get(PostAPI.byId, postsController.getPost);
forumRouter.get(PostAPI.comments, postsController.getPostComments);
forumRouter.post(
  PostAPI.root,
  validateUser,
  validatePost,
  postsController.createPost
);

forumRouter.get(CommentAPI.byId, commentsController.getComment);
forumRouter.post(
  CommentAPI.root,
  validateUser,
  validateComment,
  commentsController.createComment
);

export default forumRouter;
