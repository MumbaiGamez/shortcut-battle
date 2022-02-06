import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/Form';

import { useNewTopic } from './useNewTopic';

import { NewTopicPropsType } from './types';

export const NewTopic = (props: NewTopicPropsType) => {
  const { saveCallback } = props;

  const { t } = useTranslation();

  const { inputsList, isFormValid, handleSave } = useNewTopic(saveCallback);

  return (
    <Form
      buttonText={t('forum.save')}
      inputsList={inputsList}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleSave}
      title={t('forum.newTopic')}
      isLoading={false}
    />
  );
};
