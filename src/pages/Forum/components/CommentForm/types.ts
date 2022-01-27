import { NewCommentType } from '@redux/types/apiTypes';

export type CommentFormPropsType = {
  sendCallback: (props: NewCommentType) => void;
  postId: number;

  textClassName?: string;
};
