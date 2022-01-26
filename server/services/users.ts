import { User } from '../models';

export const create = async (id: string) => {
  return await User.create({ id });
};

export const getById = async (id: string) => {
  return await User.findByPk(id);
};
