import { RequestHandler } from 'express';

import * as usersService from '../services/users';
import * as settingsService from '../services/settings';

export const auth: RequestHandler = async (req, res, next) => {
  if (!req.session.userId && req.cookies.sbUserId) {
    req.session.userId = req.cookies.sbUserId as string;

    const user = await usersService.getById(req.session.userId);

    if (!user) {
      await usersService.create(req.session.userId);
      await settingsService.create({ userId: req.session.userId, lang: '' });
    }

    req.session.userSettings = await settingsService.getByUserId(
      req.session.userId
    );
  }

  if (req.session.userId && !req.cookies.sbUserId) {
    delete req.session.userId;
    delete req.session.userSettings;
  }

  next();
};
