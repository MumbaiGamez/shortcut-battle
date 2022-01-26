import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { SettingsCreationAttributes } from '../models';
import * as usersService from '../services/users';
import * as settingsService from '../services/settings';

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);

    return user ? res.json(user) : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const getSettings: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const userSettings = await settingsService.getByUserId(userId as string);

    return userSettings
      ? res.json(userSettings)
      : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const updateSettings: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId as string;
    const { lang } = req.body.data;
    const data: SettingsCreationAttributes = { lang, userId };

    await settingsService.update(userId, data);

    Object.assign(req.session.userSettings, data);

    return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};
