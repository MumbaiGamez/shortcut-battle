import {
  Settings,
  SettingsAttributes,
  SettingsCreationAttributes,
} from '../models';

export const create = async (data: SettingsCreationAttributes) => {
  return await Settings.create(data);
};

export const getByUserId = async (userId: SettingsAttributes['userId']) => {
  return await Settings.findOne({ where: { userId } });
};

export const update = async (
  userId: SettingsAttributes['userId'],
  data: SettingsCreationAttributes
) => {
  return await Settings.update(data, { where: { userId }, returning: true });
};
