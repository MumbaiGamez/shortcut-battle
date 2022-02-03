export type AvatarProps = {
  handleChangeAvatar?: (newAvatar: File) => void;
  handleDeleteAvatar?: () => void;
  name?: string;
  src?: string;
  size?: number;
};
