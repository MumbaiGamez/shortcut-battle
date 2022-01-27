import React from 'react';

import classNames from 'classnames';

import { TextWithUnderline } from '@components/TextWithUnderline';
import { Button, ButtonTheme } from '@components/Button';
import { Input } from '@components/Input';

import { useCommentForm } from './useCommentForm';

import { CommentFormPropsType } from './types';

import styles from './CommentForm.css';

import SendIcon from '@assets/icons/send.svg';

export const CommentForm = (props: CommentFormPropsType) => {
  const { textClassName } = props;

  const {
    isShowInput,
    inputValue,
    handleInputChange,
    sendComment,
    toggleInput,
  } = useCommentForm(props);

  return (
    <div className={styles.commentFormContainer}>
      <TextWithUnderline
        className={classNames(styles.reply, textClassName)}
        onClick={toggleInput}
        text={'Reply'}
      />
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
  );
};
