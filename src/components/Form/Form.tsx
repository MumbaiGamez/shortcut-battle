import React from 'react';
import classNames from 'classnames';

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
        <span
          className={classNames(styles.toggleFormText, toggleFormClass)}
          onClick={toggleForm}
        >
          {toggleFormText}
        </span>
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
