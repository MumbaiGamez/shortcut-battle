import React from 'react';

import { Form } from '@components/Form';

import { useNewTopic } from './useNewTopic';

import { NewTopicPropsType } from './types';

export const NewTopic = (props: NewTopicPropsType) => {
  const { saveCallback } = props;

  const { inputsList, isFormValid, handleSave } = useNewTopic(saveCallback);

  return (
    <Form
      buttonText="Save"
      inputsList={inputsList}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleSave}
      title="New topic"
      isLoading={false}
    />
  );
};
