import React from 'react';

import { AuthorText } from '../AuthorText';
import { CommentForm } from '../CommentForm';

import { useComment } from './useComment';

import { CommentPropsType } from './types';

import styles from './Comment.css';

const DEFAUL_LEFT_PADDING = 15;

export const Comment = (props: CommentPropsType) => {
  const {
    id,
    author,
    text,
    comments,
    createdAt,
    updatedAt,
    postId,
    level = 1,
  } = props;

  const { addComment, isAuth } = useComment();

  return (
    <>
      <div
        className={styles.comment}
        style={{ marginLeft: level * DEFAUL_LEFT_PADDING }}
      >
        <p className={styles.text}>{text}</p>
        <AuthorText
          author={author.login}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
        {isAuth && (
          <CommentForm
            sendCallback={addComment}
            postId={postId}
            parentCommentId={id}
          />
        )}
      </div>
      {comments
        ?.filter(({ parentCommentId }) => parentCommentId === id)
        .map((comment) => {
          return (
            <Comment
              key={comment.id}
              {...comment}
              comments={comments}
              level={level + 1}
            />
          );
        })}
    </>
  );
};
