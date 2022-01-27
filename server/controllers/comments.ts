import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import { CommentCreationAttributes } from '../models';
import * as commentsService from '../services/comments';

export const createComment: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.user?.id as string;
    const { text, postId } = req.body;
    const data: CommentCreationAttributes = { authorId: userId, text, postId };

    const newComment = await commentsService.create(data);

    return newComment
      ? res.json(newComment)
      : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const getComment: RequestHandler = async (req, res, next) => {
  try {
    const comment = await commentsService.getById(Number(req.params.id));

    return comment ? res.json(comment) : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};
