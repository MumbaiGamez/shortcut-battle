export type FilePickerProps = {
  handleChange(value: string): void;

  containerClassName?: string;
  inputClassName?: string;
};

export type UseFilePickerType = Pick<FilePickerProps, 'handleChange'>;
