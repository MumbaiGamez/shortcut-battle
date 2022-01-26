import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import { PostCreationAttributes } from '../models';

import * as postsService from '../services/posts';

export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.session.userId as string;
    const { title, text } = req.body;
    const data: PostCreationAttributes = { authorId: userId, title, text };

    const newPost = await postsService.create(data);

    return newPost ? res.json(newPost) : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const getPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await postsService.getById(Number(req.params.id));

    return post ? res.json(post) : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const getAllPosts: RequestHandler = async (req, res, next) => {
  try {
    const allPosts = await postsService.getAll();

    return res.json(allPosts);
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};

export const getPostComments: RequestHandler = async (req, res, next) => {
  try {
    const post = await postsService.getById(Number(req.params.id));

    return post
      ? res.json(post.comments)
      : next(new createHttpError.NotFound());
  } catch (err) {
    return next(new createHttpError.InternalServerError());
  }
};
