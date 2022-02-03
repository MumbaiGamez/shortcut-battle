import { RequestHandler } from 'express';

import { UserAttributes } from '../models';
import * as usersService from '../services/users';
import * as settingsService from '../services/settings';

export const auth: RequestHandler = async (req, res, next) => {
  if (!req.session.user && req.cookies.sbUser) {
    req.session.user = JSON.parse(req.cookies.sbUser) as UserAttributes;

    const userId = req.session.user?.id;
    const user = await usersService.getById(userId);

    if (!user) {
      await usersService.create(req.session.user);
      await settingsService.create({ userId, lang: '' });
    }

    req.session.userSettings = await settingsService.getByUserId(userId);
  }

  if (req.session.user && !req.cookies.sbUser) {
    delete req.session.user;
    delete req.session.userSettings;
  }

  next();
};
