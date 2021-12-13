type HeaderListType = {
  title: string;
  prop: string;

  handleClick?: () => void;
};

type DataListType = {
  id: string;
  [key: string]: number | string;
};

export type TableProps = {
  headerList: HeaderListType[];
  dataList: DataListType[];
};
