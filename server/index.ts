import express from 'express';

import { cors, render } from './middlewares';
import { router } from './routes';
import { sequelize } from './sequelize';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use(...render);
app.use(router);

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (err) {
    console.error('Sequelize sync error:', err);
  }

  app
    .listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.error('App start error:', err.stack);
    });
})();
