import React from 'react';
import classNames from 'classnames';

import { TableProps } from './types';

import styles from './Table.css';

export const Table = (tableData: TableProps) => {
  const { dataList, headerList } = tableData;

  return (
    <table>
      <thead>
        <tr>
          {headerList.map(({ title, handleClick }) => (
            <th
              key={title}
              onClick={handleClick}
              className={classNames(handleClick && styles.pointer)}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataList.map((rowData, rowIndex) => {
          const colsValues = Object.values(rowData);

          return (
            <tr key={rowIndex} className={styles.tableRow}>
              {colsValues.map((colValue, calIndex) => (
                <td key={`${calIndex}${colValue}`}>{colValue}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
