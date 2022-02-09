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

export const fillWithMocks = async () => {
  const {
    users,
    settings,
    posts,
  }: // eslint-disable-next-line @typescript-eslint/no-var-requires
  Record<string, any> = require('./mocks.json');
  User.bulkCreate(users);
  Settings.bulkCreate(settings);
  await Promise.all(
    posts.map(({ comments, ...rest }: any) => {
      return Post.create(rest).then(({ id }) => {
        return Promise.all(
          comments.map((comment: any) => {
            return Comment.create({ ...comment, postId: id });
          })
        );
      });
    })
  ).catch((err) => {
    console.log(err.message);
  });
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
