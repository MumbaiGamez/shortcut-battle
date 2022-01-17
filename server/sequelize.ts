import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { Comment, Post, Settings, User } from './models';

const sequelizeOptions: SequelizeOptions = {
  database: 'users-data',
  host: 'postgres',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres',
  models: [User, Settings, Post, Comment],
};

export const sequelize = new Sequelize(sequelizeOptions);
