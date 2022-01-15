import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { isProd } from '../lib/env';
import { i18n } from './services';
import { auth, cors, render } from './middlewares';
import { router } from './routes';
import { sequelize } from './sequelize';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const {
  PORT = 3000,
  SESSION_MAX_AGE = 1000 * 60 * 60 * 2,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'secret',
} = process.env;

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESSION_MAX_AGE as number,
      sameSite: true,
      secure: isProd,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

i18n.i18nInit(app);

app.use(cors);
app.use(auth);
app.use(...render);
app.use(router);

(async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('Sequelize sync error:', err);
  }

  const run = () => {
    app
      .listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      })
      .on('error', (err) => {
        console.error('App start error:', err.stack);
      });
  };

  if (i18n.instance.isInitialized) {
    run();
  } else {
    i18n.instance.on('initialized', run);
  }
})();
