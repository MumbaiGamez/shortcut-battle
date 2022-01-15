import { User } from '../models';

export const getById = async (id: string) => {
  return await User.findByPk(id);
};
