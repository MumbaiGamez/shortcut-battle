export type ToasterProps = {
  text: string;
  theme: ToasterTheme;
  toasterId: number | null;
};

export type UseToasterProps = Omit<ToasterProps, 'theme'>;

export enum ToasterTheme {
  Error = 'Error',
  Success = 'Success',
}
