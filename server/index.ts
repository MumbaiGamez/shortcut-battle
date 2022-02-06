import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import * as helmet from 'helmet';
import * as crypto from "crypto";

import { isProd, isDev } from '../lib/env';
import i18n, { i18nInit } from './services/i18n';
import { auth, cors, render } from './middlewares';
import router from './routes';
import sequelize, { fillWithMocks } from './sequelize';

const {
  PORT = 3000,
  SESSION_MAX_AGE = 1000 * 60 * 60 * 2,
  SESSION_NAME = 'sid',
  SESSION_SECRET = 'secret',
} = process.env;

const app = express();

app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
  next();
});
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

i18nInit(app);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https://ya-praktikum.tech'],
      connectSrc: ["'self'", 'https://ya-praktikum.tech'],
      imgSrc: ["'self'", 'https://ya-praktikum.tech'],
      scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`, 'https://ya-praktikum.tech',  "'unsafe-inline'"],
      fontSrc: ["'self'", 'https://fonts.googleapis.com'],
    },
  })
);

app.use(cors);
app.use(auth);
app.use(...render);
app.use(router);

(async () => {
  try {
    await sequelize.sync({ force: isDev });

    if (isDev) {
      fillWithMocks();
    }
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

  if (i18n.isInitialized) {
    run();
  } else {
    i18n.on('initialized', run);
  }
})();
