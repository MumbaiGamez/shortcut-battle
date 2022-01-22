import { CommentType } from '@redux/types/apiTypes';

export type CommentPropsType = CommentType & {
  level?: number;
};
