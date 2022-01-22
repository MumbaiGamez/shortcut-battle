import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAddTopicMutation } from '@redux/api/forumApi';

import { FieldsList } from '@components/Form/types';
import { useForm } from '@components/Form/useForm';
import { InputTypeEnum } from '@components/Input';
import { RoutesList } from '@components/NavigationMenu/useNavigationMenu';

import { setFormFieldValueFactory } from '@utils/setFormFieldValueFactory';

export const useNewTopic = () => {
  const navigate = useNavigate();

  const [newTopicData, setNewTopicData] = useState({
    title: '',
    text: '',
  });

  const changeNewTopicDataFactory = setFormFieldValueFactory(setNewTopicData);

  const { isFormValid, validateField } = useForm({
    fieldsObject: newTopicData,
  });

  const [addTopic, { isLoading }] = useAddTopicMutation();

  const handleSave = () => {
    if (isFormValid) {
      addTopic(newTopicData);
      navigate(RoutesList.forum);
    }
  };

  const inputsList = useMemo(() => {
    return [
      {
        fieldName: FieldsList.title,
        handleChange: changeNewTopicDataFactory(FieldsList.title),
        placeholder: 'Title',
        value: newTopicData.title,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.text,
        handleChange: changeNewTopicDataFactory(FieldsList.text),
        placeholder: 'Text',
        type: InputTypeEnum.textarea,
        value: newTopicData.text,
        validationRule: { isRequired: true },
        validateField,
      },
    ];
  }, [changeNewTopicDataFactory, newTopicData, validateField]);

  return { handleSave, inputsList, isFormValid, isLoading };
};