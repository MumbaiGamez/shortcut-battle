import React from 'react';

import { Button, ButtonTheme } from '@components/Button';

import { TopicListItem } from './components/TopicListItem';

import { useForum } from './useForum';

import styles from './Forum.css';

export const Forum = () => {
  const { isAuth, goToNewTopicPage, topics } = useForum();

  return (
    <div className={styles.forum}>
      {topics?.map((topic) => (
        <TopicListItem key={topic.id} {...topic} />
      ))}
      {isAuth && (
        <Button
          theme={ButtonTheme.Glow}
          className={styles.addPost}
          onClick={goToNewTopicPage}
        >
          Add new post
        </Button>
      )}
    </div>
  );
};
