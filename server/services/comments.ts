import {
  Comment,
  CommentCreationAttributes,
  CommentAttributes,
} from '../models';

export const create = async (data: CommentCreationAttributes) => {
  return await Comment.create(data);
};

export const getById = async (id: CommentAttributes['id']) => {
  return await Comment.findByPk(id);
};

export const update = async (
  id: CommentAttributes['id'],
  data: CommentCreationAttributes
) => {
  return await Comment.update(data, { where: { id } });
};
