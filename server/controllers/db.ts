import { RequestHandler } from 'express';

import { User } from '../models';

export const getUser: RequestHandler = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => (user ? res.json(user) : next({ statusCode: 404 })))
    .catch(next);
};
