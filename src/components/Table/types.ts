type HeaderListType = {
  title: string;

  handleClick?: () => void;
};

type DataListType = {
  id: string;
  [key: string]: string;
};

export type TableProps = {
  headerList: HeaderListType[];
  dataList: DataListType[];
};
