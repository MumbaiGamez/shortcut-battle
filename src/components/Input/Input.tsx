import React from 'react';
import classNames from 'classnames';

import { InputProps } from './types';

import { useInput } from './useInput';

import EyeIcon from '../../assets/icons/eye.svg';
import EyeCrossedIcon from '../../assets/icons/eyeCrossed.svg';

import styles from './Input.css';

export const Input: InputProps = ({
  inputHandler,
  placeholder,
  type,
  value,
}) => {
  const {
    clearInputValue,
    defaultInputType,
    defaultInputValue,
    handleInputChange,
    isShowEyeIcon,
    isCrossedEye,
    toggleEye,
  } = useInput({
    inputHandler,
    type,
    value,
  });

  return (
    <div className={styles.inputContainer}>
      <input
        className={classNames(styles.input)}
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
    </div>
  );
};
