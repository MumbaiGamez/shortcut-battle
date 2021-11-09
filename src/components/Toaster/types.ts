export type ToasterProps = {
  text: string;
  theme: ToasterTheme;
  toasterId: number | null;
};

export type UseToasterProps = ToasterProps;

export enum ToasterTheme {
  Error = 'Error',
  Success = 'Success',
}
