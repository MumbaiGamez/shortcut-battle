export type FilePickerProps = {
  handleChange(file: File): void;

  containerClassName?: string;
  inputClassName?: string;
};

export type UseFilePickerType = Pick<FilePickerProps, 'handleChange'>;
