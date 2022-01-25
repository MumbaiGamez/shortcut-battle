import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { body } from 'express-validator';

export const validateUser: RequestHandler = (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    return next(new createHttpError.Unauthorized());
  }

  next();
};

export const validateSettings: RequestHandler = body('data')
  .isObject()
  .custom((value) => {
    const checkRegex = /(lang)/;

    if (Object.keys(value).every((key) => checkRegex.test(key))) {
      return true;
    }

    throw new Error("Settings value doesn't match schema");
  });
