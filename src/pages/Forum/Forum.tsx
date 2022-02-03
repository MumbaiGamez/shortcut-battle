import React from 'react';

import { Button, ButtonTheme } from '@components/Button';
import { Loader } from '@components/Loader';

import { TopicListItem } from './components/TopicListItem';
import { NewTopic } from './components/NewTopic';

import { useForum } from './useForum';

import styles from './Forum.css';

export const Forum = () => {
  const {
    isAuth,
    isEmptyData,
    isLoading,
    isNewTopicOpen,
    switchNewTopic,
    topics,
  } = useForum();

  return (
    <div className={styles.forum}>
      <div className={styles.topicsContainer}>
        {isLoading && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        {!isLoading && isEmptyData && (
          <div className={styles.emptyData}>No topics yet</div>
        )}
        {isNewTopicOpen && <NewTopic saveCallback={switchNewTopic} />}
        {topics?.map((topic) => (
          <TopicListItem key={topic.id} {...topic} />
        ))}
      </div>
      {isAuth && (
        <Button
          theme={ButtonTheme.Glow}
          className={styles.addPost}
          onClick={switchNewTopic}
        >
          {isNewTopicOpen ? 'Close form' : 'Add new post'}
        </Button>
      )}
    </div>
  );
};
