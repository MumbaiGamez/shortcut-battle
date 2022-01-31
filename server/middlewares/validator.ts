import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { body } from 'express-validator';

import { SchemaMismatchError } from '../errors';

export const validateUser: RequestHandler = (req, res, next) => {
  const userId = req.session.user?.id;

  if (!userId) {
    return next(new createHttpError.Unauthorized());
  }

  next();
};

export const validateSettings: RequestHandler = body('data')
  .isObject()
  .custom((value) => {
    if (value.lang) {
      return true;
    }

    throw new SchemaMismatchError('Settings');
  });

export const validatePost: RequestHandler = body('data')
  .isObject()
  .custom((value) => {
    if (value.title && value.text) {
      return true;
    }

    throw new SchemaMismatchError('Post');
  });

export const validateComment: RequestHandler = body('data')
  .isObject()
  .custom((value) => {
    if (value.text && value.postId) {
      return true;
    }

    throw new SchemaMismatchError('Comment');
  });
