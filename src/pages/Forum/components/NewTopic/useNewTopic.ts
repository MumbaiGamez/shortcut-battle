import { useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useAddTopicMutation } from '@redux/api/forumApi';

import { FieldsList } from '@components/Form/types';
import { useForm } from '@components/Form/useForm';
import { InputTypeEnum } from '@components/Input';

import { setFormFieldValueFactory } from '@utils/setFormFieldValueFactory';

import { NewTopicPropsType } from './types';

export const useNewTopic = (
  saveCallback: NewTopicPropsType['saveCallback']
) => {
  const [newTopicData, setNewTopicData] = useState({
    title: '',
    text: '',
  });

  const { t } = useTranslation();

  const changeNewTopicDataFactory = setFormFieldValueFactory(setNewTopicData);

  const { isFormValid, validateField } = useForm({
    fieldsObject: newTopicData,
  });

  const [addTopic, { isLoading }] = useAddTopicMutation();

  const handleSave = () => {
    if (isFormValid) {
      addTopic(newTopicData);
      saveCallback();
    }
  };

  const inputsList = useMemo(() => {
    return [
      {
        fieldName: FieldsList.title,
        handleChange: changeNewTopicDataFactory(FieldsList.title),
        placeholder: t('forum.title'),
        value: newTopicData.title,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.text,
        handleChange: changeNewTopicDataFactory(FieldsList.text),
        placeholder: t('forum.text'),
        type: InputTypeEnum.textarea,
        value: newTopicData.text,
        validationRule: { isRequired: true },
        validateField,
      },
    ];
  }, [
    changeNewTopicDataFactory,
    newTopicData.text,
    newTopicData.title,
    t,
    validateField,
  ]);

  return { handleSave, inputsList, isFormValid, isLoading };
};
