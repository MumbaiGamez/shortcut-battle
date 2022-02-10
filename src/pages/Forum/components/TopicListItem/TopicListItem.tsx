import React from 'react';
import { Trans } from 'react-i18next';
import classNames from 'classnames';

import { TopicType } from '@redux/types/apiTypes';

import { TextWithUnderline } from '@components/TextWithUnderline';
import { Avatar } from '@components/Avatar';
import { Card } from '@components/Card';

import { Comment } from '../Comment';
import { CommentForm } from '../CommentForm';
import { AuthorText } from '../AuthorText';

import { useTopicListItem } from './useTopicListItem';

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
    isAuth,
    isOpen,
    isShowComments,
    switchTextView,
    switchComments,
  } = useTopicListItem();

  const transKey = !comments.length
    ? 'forum.empty'
    : isShowComments
    ? 'forum.hide'
    : 'forum.show';
  const commentsText = (
    <Trans i18nKey={transKey} values={{ count: comments.length }} />
  );

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
        <AuthorText
          author={author.login}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
        {isAuth && <CommentForm sendCallback={addComment} postId={id} />}
        <TextWithUnderline
          className={styles.comments}
          text={commentsText}
          onClick={switchComments}
        />
        {isShowComments &&
          comments
            ?.filter(({ parentCommentId }) => !parentCommentId)
            .map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  {...comment}
                  comments={comments}
                  postId={id}
                />
              );
            })}
      </div>
    </Card>
  );
};
