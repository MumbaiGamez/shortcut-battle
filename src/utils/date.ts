export const transformDate = (date: string) => {
  const currentDate = new Date();
  const dateObj = new Date(date);

  currentDate.setHours(0, 0, 0, 0);

  const hours = `0${dateObj.getHours() + 1}`.slice(-2);
  const minutes = `0${dateObj.getMinutes() + 1}`.slice(-2);

  if (dateObj.getTime() > currentDate.getTime()) {
    return `${hours}:${minutes}`;
  }

  const year = dateObj.getFullYear();
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const day = `0${dateObj.getDate() + 1}`.slice(-2);

  return `${year}.${month}.${day}, ${hours}:${minutes}`;
};
