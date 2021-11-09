import React from 'react';
import classNames from 'classnames';

import { ButtonTheme, Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Card } from '../../../../components/Card';
import { Loader } from '../../../../components/Loader';

import { FormComponentProps } from './types';

import styles from './FormComponent.css';

export const FormComponent = (props: FormComponentProps) => {
  const {
    buttonText,
    inputsList,
    isLoading,
    isButtonDisabled,
    onButtonClick,
    switchForm,
    switchFormClass,
    switchFormText,
    title,
  } = props;
  return (
    <Card title={title}>
      {isLoading && <Loader />}
      {inputsList.map((inputProps) => {
        return <Input key={inputProps.placeholder} {...inputProps} />;
      })}
      {switchFormText && (
        <span
          className={classNames(styles.switchFormText, switchFormClass)}
          onClick={switchForm}
        >
          {switchFormText}
        </span>
      )}
      <Button
        isDisabled={isButtonDisabled}
        onClick={onButtonClick}
        theme={ButtonTheme.Glow}
      >
        {buttonText}
      </Button>
    </Card>
  );
};
