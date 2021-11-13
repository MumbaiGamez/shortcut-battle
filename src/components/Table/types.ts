type HeaderListType = {
  title: string;

  handleClick?: () => void;
};

type DataListType = {
  [key: string]: string;
};

export type TableProps = {
  headerList: HeaderListType[];
  dataList: DataListType[];
};
