import { RequestHandler } from 'express';

export const cors: RequestHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET POST, PUT, DELETE');

  next();
};
