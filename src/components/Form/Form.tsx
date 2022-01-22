import React from 'react';

import { TextWithUnderline } from '../TextWithUnderline';
import { ButtonTheme, Button } from '../Button';
import { Input } from '../Input';
import { Card } from '../Card';
import { Loader } from '../Loader';

import { FormProps } from './types';

import styles from './Form.css';

export const Form = (props: FormProps) => {
  const {
    additionalButton,
    buttonText,
    children,
    inputsList,
    isLoading,
    isButtonDisabled,
    onButtonClick,
    toggleForm,
    toggleFormClass,
    toggleFormText,
    title,
  } = props;

  return (
    <Card title={title}>
      {isLoading && <Loader />}
      {children}
      {inputsList.map((inputProps) => {
        return <Input key={inputProps.placeholder} {...inputProps} />;
      })}
      {toggleFormText && (
        <TextWithUnderline
          className={toggleFormClass}
          onClick={toggleForm}
          text={toggleFormText}
        />
      )}
      {additionalButton}
      <Button
        isDisabled={isButtonDisabled}
        onClick={onButtonClick}
        theme={ButtonTheme.Glow}
        className={styles.button}
      >
        {buttonText}
      </Button>
    </Card>
  );
};
