import React from 'react';

import { Form } from '@components/Form';

import { useNewTopic } from './useNewTopic';

import styles from './NewTopic.css';

export const NewTopic = () => {
  const { inputsList, isFormValid, handleSave } = useNewTopic();
  return (
    <div className={styles.newTopic}>
      <Form
        buttonText="Save"
        inputsList={inputsList}
        isButtonDisabled={!isFormValid}
        onButtonClick={handleSave}
        title="New topic"
        isLoading={false}
      />
    </div>
  );
};
