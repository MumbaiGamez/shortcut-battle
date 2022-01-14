import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { User } from './models';

const sequelizeOptions: SequelizeOptions = {
  database: 'settings-db',
  host: 'postgres',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  models: [User],
};

export const sequelize = new Sequelize(sequelizeOptions);
