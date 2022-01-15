import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { users, settings } from '../services';

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await users.getById(req.params.id);

    return user ? res.json(user) : next(new createHttpError.NotFound());
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const userSettings = await settings.getByUserId(userId as string);

    return userSettings
      ? res.json(userSettings)
      : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const updateSettings: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.session;
    const { settings } = req.body;

    await settings.updateByUserId(userId, settings);

    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};
