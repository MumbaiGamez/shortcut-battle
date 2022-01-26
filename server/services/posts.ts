import {
  Post,
  PostCreationAttributes,
  PostAttributes,
  Comment,
} from '../models';

export const create = async (data: PostCreationAttributes) => {
  const post = await Post.create(data);
  return post;
};

export const getById = async (id: PostAttributes['id']) => {
  const post = await Post.findByPk(id);
  return post;
};

export const update = async (
  id: PostAttributes['id'],
  data: PostCreationAttributes
) => {
  const updatedPost = await Post.update(data, { where: { id } });
  return updatedPost;
};

export const deleteById = async (id: PostAttributes['id']) => {
  const deletedPost = await Post.destroy({ where: { id } });
  return deletedPost;
};

export const getAll = async () => {
  const posts = await Post.findAll({ include: [Comment] });
  return posts;
};
