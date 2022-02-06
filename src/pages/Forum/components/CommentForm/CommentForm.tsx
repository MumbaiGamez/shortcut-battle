import React from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

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
        text={t('forum.reply')}
      />
      {isShowInput && (
        <div className={styles.inputContainer}>
          <Input
            value={inputValue}
            handleChange={handleInputChange}
            placeholder={t('forum.addComment')}
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
