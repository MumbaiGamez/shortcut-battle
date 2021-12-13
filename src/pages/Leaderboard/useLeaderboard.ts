import { useCallback, useMemo, useState } from 'react';

import { useAppSelector } from '@redux/hooks';
import { selectLeaders, selectPlayerStats } from '@redux/slices/gameSlice';

export const useLeaderboard = () => {
  const { rating, score } = useAppSelector(selectPlayerStats);
  const data = useAppSelector(selectLeaders);

  const formattedDataList = (data || []).map((leader) => {
    return {
      id: leader.login,
      ...leader,
    };
  });

  const [dataList, setLeadersList] = useState(formattedDataList);
  const [sortDirection, setSortDirection] = useState(-1);

  const sortByLogin = useCallback(() => {
    const sortedDataList = [...dataList].sort((a, b) => {
      if (a.login < b.login) return -sortDirection;
      if (a.login > b.login) return sortDirection;

      return 0;
    });

    setLeadersList(sortedDataList);
    setSortDirection((prev) => -prev);
  }, [dataList, sortDirection]);

  const sortByRating = useCallback(() => {
    const sortedDataList = [...dataList].sort(
      (a, b) => sortDirection * (a.score - b.score)
    );

    setLeadersList(sortedDataList);
    setSortDirection((prev) => -prev);
  }, [dataList, sortDirection]);

  const headerList = useMemo(() => {
    return [
      { title: 'Rating', prop: 'rating' },
      { title: 'Login', prop: 'login', handleClick: sortByLogin },
      { title: 'Score', prop: 'score', handleClick: sortByRating },
    ];
  }, [sortByLogin, sortByRating]);

  return { dataList, headerList, rating, score };
};
