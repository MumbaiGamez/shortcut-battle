import { Settings } from '../models';

export const getByUserId = async (userId: string) => {
  return await Settings.findOne({ where: { user_id: userId } });
};

export const updateByUserId = async (userId: string, updated: Settings) => {
  return await Settings.update(updated, { where: { user_id: userId } });
};
