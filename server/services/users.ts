import { User, UserAttributes } from '../models';

export const create = async (data: UserAttributes) => {
  return await User.create(data);
};

export const getById = async (id: UserAttributes['id']) => {
  return await User.findByPk(id);
};
