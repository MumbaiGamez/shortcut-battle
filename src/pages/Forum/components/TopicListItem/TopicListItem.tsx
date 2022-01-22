import React from 'react';

import classNames from 'classnames';

import { TopicType } from '@redux/types/apiTypes';

import { TextWithUnderline } from '@components/TextWithUnderline';
import { Avatar } from '@components/Avatar';
import { Card } from '@components/Card';

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

  const { isOpen, switchTextView, openTopicPage } = useTopicListItem(id);

  return (
    <Card className={styles.container} contentClassName={styles.cardContent}>
      <Avatar name={author} src={avatar} size={50} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <span
          className={classNames(styles.text, isOpen && styles.fullText)}
          onClick={switchTextView}
        >
          {text}
        </span>
        <span className={styles.time}>
          {updatedAt ? `Created at ${updatedAt}` : `Updated at ${createdAt}`} by{' '}
          {author}
        </span>
        <TextWithUnderline
          className={styles.comments}
          text={`${comments?.length || 0} comments`}
          onClick={openTopicPage}
        />
      </div>
    </Card>
  );
};
