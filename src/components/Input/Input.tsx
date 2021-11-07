import React from 'react';
import classNames from 'classnames';

import { InputProps } from './types';

import { useInput } from './useInput';

import EyeIcon from '../../assets/icons/eye.svg';
import EyeCrossedIcon from '../../assets/icons/eyeCrossed.svg';

import styles from './Input.css';

export const Input = (props: InputProps) => {
  const { inputHandler, label, placeholder, validationRule, type, value } =
    props;

  const {
    clearInputValue,
    currentType,
    currentValue,
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
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <input
        className={classNames(styles.input, errorMessage && styles.errorBorder)}
        onChange={handleInputChange}
        placeholder={placeholder}
        type={currentType}
        value={currentValue}
      />
      {isShowEyeIcon ? (
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
