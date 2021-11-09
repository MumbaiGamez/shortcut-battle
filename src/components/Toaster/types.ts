export type ToasterProps = {
  errorId: number | null;

  isSuccess?: boolean;
  isError?: boolean;
  text: string;
};

export type UseToasterProps = ToasterProps;
