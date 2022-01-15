import { RequestHandler } from 'express';

export const auth: RequestHandler = (req, res, next) => {
  if (!req.session.userId && req.cookies.sbUserId) {
    req.session.userId = req.cookies.sbUserId;
  }

  if (req.session.userId && !req.cookies.sbUserId) {
    delete req.session.userId;
  }

  next();
};
