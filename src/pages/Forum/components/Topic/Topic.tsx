import React from 'react';

import { Avatar } from '@components/Avatar';
import { Card } from '@components/Card';

import { Comment } from '../Comment';

import { useTopic } from './useTopic';

import styles from './Topic.css';

export const Topic = () => {
  const { topic } = useTopic();

  const { avatar, author, title, text, createdAt, updatedAt, comments } = topic;

  return (
    <Card className={styles.container} contentClassName={styles.cardContent}>
      <Avatar name={author} src={avatar} size={50} />
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.time}>
          {updatedAt ? `Created at ${updatedAt}` : `Updated at ${createdAt}`} by{' '}
          {author}
        </span>
        <span className={styles.text}>{text}</span>
        {comments.map((comment) => {
          return <Comment key={comment.id} {...comment} />;
        })}
      </div>
    </Card>
  );
};
