import React from 'react';
import classNames from 'classnames';

import { InputTypeEnum } from '../Input';

import { FilePickerProps } from './types';

import { useFilePicker } from './useFilePicker';

import styles from './FilePicker.css';

export const FilePicker = (props: FilePickerProps) => {
  const { containerClassName, inputClassName, handleChange } = props;

  const { handleInputChange } = useFilePicker({ handleChange });

  return (
    <div className={classNames(styles.filePickerContainer, containerClassName)}>
      <input
        className={classNames(styles.filePickerInput, inputClassName)}
        type={InputTypeEnum.file}
        onChange={handleInputChange}
      />
    </div>
  );
};
