import React from 'react';
import classNames from 'classnames';

import { InputProps, InputTypeEnum } from './types';

import { useInput } from './useInput';

import EyeIcon from '@assets/icons/eye.svg';
import EyeCrossedIcon from '@assets/icons/eyeCrossed.svg';

import styles from './Input.css';

export const Input = (props: InputProps) => {
  const {
    className,
    fieldName,
    handleChange,
    label,
    placeholder,
    type,
    value,
    validationRule,
    validateField,
  } = props;

  const {
    clearInputValue,
    currentType,
    currentValue,
    errorMessage,
    handleInputChange,
    shouldShowEyeIcon,
    isCrossedEye,
    toggleEye,
  } = useInput({
    fieldName,
    handleChange,
    validationRule,
    type,
    value,
    validateField,
  });

  return (
    <div className={classNames(styles.inputContainer, className)}>
      {label && <span className={styles.label}>{label}</span>}
      {type === InputTypeEnum.textarea ? (
        <textarea
          className={classNames(
            styles.input,
            errorMessage && styles.errorBorder
          )}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={currentValue}
        />
      ) : (
        <input
          className={classNames(
            styles.input,
            errorMessage && styles.errorBorder
          )}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={currentType}
          value={currentValue}
        />
      )}

      {shouldShowEyeIcon ? (
        isCrossedEye ? (
          <EyeCrossedIcon
            className={classNames(styles.icon, styles.button)}
            onClick={toggleEye}
          />
        ) : (
          <EyeIcon
            className={classNames(styles.icon, styles.button)}
            onClick={toggleEye}
          />
        )
      ) : (
        <span
          className={classNames(styles.clearButton, styles.button)}
          onClick={clearInputValue}
        />
      )}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};
