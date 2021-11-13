import { useState } from 'react';

const leadersMockList = [
  { teamName: 'Team 3', ratingFieldName: '1', data: { score: '400' } },
  { teamName: 'Team 2', ratingFieldName: '2', data: { score: '500' } },
  { teamName: 'Team 1', ratingFieldName: '3', data: { score: '600' } },
  { teamName: 'Team 4', ratingFieldName: '4', data: { score: '700' } },
];

const mockUserRank = '3';
const mockUserScore = '700';

export const useLeaderboard = () => {
  const formattedDataList = leadersMockList.map((leader) => {
    return {
      ratingFieldName: leader.ratingFieldName,
      teamName: leader.teamName,
      score: leader.data.score,
    };
  });

  const [dataList, setlLadersList] = useState(formattedDataList);
  const [sortDirection, setSortDirection] = useState(-1);

  const sortByTeamName = () => {
    const sortedDataList = [...dataList].sort((a, b) => {
      if (a.teamName < b.teamName) return -sortDirection;
      if (a.teamName > b.teamName) return sortDirection;

      return 0;
    });

    setlLadersList(sortedDataList);
    setSortDirection((prev) => -prev);
  };

  const sortByRaiting = () => {
    const sortedDataList = [...dataList].sort(
      (a, b) =>
        sortDirection *
        (parseInt(a.ratingFieldName) - parseInt(b.ratingFieldName))
    );

    setlLadersList(sortedDataList);
    setSortDirection((prev) => -prev);
  };

  const headerList = [
    { title: 'Raiting' },
    { title: 'Team Name', handleClick: sortByTeamName },
    { title: 'Score', handleClick: sortByRaiting },
  ];

  const userRank = mockUserRank;
  const userScore = mockUserScore;

  return { dataList, headerList, userRank, userScore };
};
