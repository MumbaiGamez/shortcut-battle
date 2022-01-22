import React from 'react';

import { Avatar } from '@components/Avatar';
import { Card } from '@components/Card';

import { Comment } from '../Comment';

import { useTopic } from './useTopic';

import styles from './Topic.css';

export const Topic = () => {
  const { topic } = useTopic();

  return (
    <Card className={styles.container} contentClassName={styles.cardContent}>
      <Avatar name={topic?.author} src={topic?.avatar} size={50} />
      <div className={styles.body}>
        <h2 className={styles.title}>{topic?.title}</h2>
        <span className={styles.time}>
          {topic?.updatedAt
            ? `Created at ${topic?.updatedAt}`
            : `Updated at ${topic?.createdAt}`}{' '}
          {topic?.author}
        </span>
        <span className={styles.text}>{topic?.text}</span>
        {topic?.comments?.map((comment) => {
          return <Comment key={comment.id} {...comment} />;
        })}
      </div>
    </Card>
  );
};
