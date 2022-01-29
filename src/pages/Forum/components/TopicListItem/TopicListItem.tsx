import React from 'react';

import classNames from 'classnames';

import { TopicType } from '@redux/types/apiTypes';

import { TextWithUnderline } from '@components/TextWithUnderline';
import { Avatar } from '@components/Avatar';
import { Card } from '@components/Card';

import { Comment } from '../Comment';
import { CommentForm } from '../CommentForm';

import { useTopicListItem } from './useTopicListItem';

import { transformDate } from '@utils/date';

import styles from './TopicListItem.css';

export const TopicListItem = (props: TopicType) => {
  const {
    id,
    avatar,
    author,
    title,
    text,
    createdAt,
    updatedAt,
    comments = [],
  } = props;

  const {
    addComment,
    commentsText,
    isAuth,
    isOpen,
    isShowComments,
    switchTextView,
    switchComments,
  } = useTopicListItem(comments?.length || 0);

  return (
    <Card className={styles.container} contentClassName={styles.cardContent}>
      <Avatar name={author.login} src={avatar} size={50} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <span
          className={classNames(styles.text, isOpen && styles.fullText)}
          onClick={switchTextView}
        >
          {text}
        </span>
        <span className={styles.time}>
          {updatedAt
            ? `Updated at ${transformDate(updatedAt)}`
            : `Created at ${transformDate(createdAt)}`}
          {` by `}
          {author.login}
        </span>
        {isAuth && <CommentForm sendCallback={addComment} postId={id} />}
        <TextWithUnderline
          className={styles.comments}
          text={commentsText}
          onClick={switchComments}
        />
        {isShowComments &&
          comments?.map((comment) => {
            return <Comment key={comment.id} {...comment} postId={id} />;
          })}
      </div>
    </Card>
  );
};
