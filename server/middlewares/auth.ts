import { RequestHandler } from 'express';

import { createUser, getById } from '../services/users';
import { createSettings, getByUserId } from '../services/settings';

export const auth: RequestHandler = async (req, res, next) => {
  if (!req.session.userId && req.cookies.sbUserId) {
    req.session.userId = req.cookies.sbUserId as string;

    const user = await getById(req.session.userId);

    if (!user) {
      await createUser(req.session.userId);
      await createSettings({ userId: req.session.userId, lang: 'en' });
    }

    req.session.userSettings = await getByUserId(req.session.userId);
  }

  if (req.session.userId && !req.cookies.sbUserId) {
    delete req.session.userId;
    delete req.session.userSettings;
  }

  next();
};
