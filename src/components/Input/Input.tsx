import React from 'react';
import classNames from 'classnames';

import { InputProps } from './types';

import { useInput } from './useInput';

import EyeIcon from '../../assets/icons/eye.svg';
import EyeCrossedIcon from '../../assets/icons/eyeCrossed.svg';

import styles from './Input.css';

export const Input = ({
  inputHandler,
  label,
  placeholder,
  validationRule,
  type,
  value,
}: InputProps) => {
  const {
    clearInputValue,
    defaultInputType,
    defaultInputValue,
    errorMessage,
    handleInputChange,
    isShowEyeIcon,
    isCrossedEye,
    toggleEye,
  } = useInput({
    inputHandler,
    validationRule,
    type,
    value,
  });

  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
      <input
        className={classNames(styles.input, errorMessage && styles.errorBorder)}
        onChange={handleInputChange}
        placeholder={placeholder}
        type={defaultInputType}
        value={defaultInputValue}
      />
      {isShowEyeIcon ? (
        isCrossedEye ? (
          <EyeCrossedIcon
            className={classNames(styles.icon, styles.commonButton)}
            onClick={toggleEye}
          />
        ) : (
          <EyeIcon
            className={classNames(styles.icon, styles.commonButton)}
            onClick={toggleEye}
          />
        )
      ) : (
        <span
          className={classNames(styles.clearButton, styles.commonButton)}
          onClick={clearInputValue}
        ></span>
      )}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};