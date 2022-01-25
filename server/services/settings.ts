import { Settings, SettingsCreationAttributes } from '../models/Settings';

export const getByUserId = async (userId: string) => {
  return await Settings.findOne({ where: { userId } });
};

export const updateSettings = async (
  userId: string,
  data: SettingsCreationAttributes
) => {
  return await Settings.update(data, { where: { userId }, returning: true });
};

export const createSettings = async (data: SettingsCreationAttributes) => {
  return await Settings.create(data);
};
