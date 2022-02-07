import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetLeaderboardMutation } from '@redux/api/leaderboardApi';
import { useAppSelector } from '@redux/hooks';
import { selectLeaders, selectPlayerStats } from '@redux/slices/gameSlice';

export const useLeaderboard = () => {
  const { t } = useTranslation();

  const [getLeaderboard] = useGetLeaderboardMutation();

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  const { rating, score } = useAppSelector(selectPlayerStats);
  const leadersData = useAppSelector(selectLeaders);

  const formattedData = useMemo(
    () =>
      (leadersData || []).map((leader) => ({
        id: leader.login,
        ...leader,
      })),
    [leadersData]
  );

  const [dataList, setDataList] = useState<typeof formattedData>([]);

  useEffect(() => {
    setDataList(formattedData);
  }, [formattedData]);

  const [sortDirection, setSortDirection] = useState(-1);

  const sortByLogin = useCallback(() => {
    const sortedDataList = [...dataList].sort((a, b) => {
      if (a.login < b.login) return -sortDirection;
      if (a.login > b.login) return sortDirection;

      return 0;
    });

    setDataList(sortedDataList);
    setSortDirection((prev) => -prev);
  }, [dataList, sortDirection]);

  const sortByRating = useCallback(() => {
    const sortedDataList = [...dataList].sort(
      (a, b) => sortDirection * (a.score - b.score)
    );

    setDataList(sortedDataList);
    setSortDirection((prev) => -prev);
  }, [dataList, sortDirection]);

  const headerList = useMemo(() => {
    return [
      { title: t('leaderboard.rating'), prop: 'rating' },
      {
        title: t('leaderboard.login'),
        prop: 'login',
        handleClick: sortByLogin,
      },
      {
        title: t('leaderboard.score'),
        prop: 'score',
        handleClick: sortByRating,
      },
    ];
  }, [sortByLogin, sortByRating, t]);

  return { dataList, headerList, rating, score };
};
