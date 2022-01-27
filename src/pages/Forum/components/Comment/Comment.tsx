import React from 'react';

import { TextWithUnderline } from '@components/TextWithUnderline';
import { Button, ButtonTheme } from '@components/Button';
import { Input } from '@components/Input';

import { useComment } from './useComment';

import { CommentPropsType } from './types';

import styles from './Comment.css';

import SendIcon from '@assets/icons/send.svg';

const DEFAUL_LEFT_PADDING = 15;

export const Comment = (props: CommentPropsType) => {
  const { author, text, comments, postId, level = 1 } = props;

  const {
    isAuth,
    isShowInput,
    inputValue,
    handleInputChange,
    sendComment,
    toggleInput,
  } = useComment(postId);

  return (
    <>
      <div
        className={styles.comment}
        style={{ marginLeft: level * DEFAUL_LEFT_PADDING }}
      >
        <p className={styles.author}>{author}</p>
        <p className={styles.text}>{text}</p>
        {isAuth && (
          <TextWithUnderline
            className={styles.reply}
            onClick={toggleInput}
            text={'Reply'}
          />
        )}
        {isShowInput && (
          <div className={styles.inputContainer}>
            <Input
              value={inputValue}
              handleChange={handleInputChange}
              placeholder={'Add comment'}
              className={styles.input}
            />
            <Button
              theme={ButtonTheme.Glow}
              className={styles.button}
              isDisabled={!inputValue}
              onClick={sendComment}
            >
              <SendIcon />
            </Button>
          </div>
        )}
      </div>
      {comments?.map((comment) => {
        return <Comment key={comment.id} {...comment} level={level + 1} />;
      })}
    </>
  );
};
