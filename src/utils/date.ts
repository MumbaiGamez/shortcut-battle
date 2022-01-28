export const transformDate = (date: string) => {
  const currentDate = new Date();
  const dateObj = new Date(date);

  currentDate.setHours(0, 0, 0, 0);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  if (dateObj.getTime() > currentDate.getTime()) {
    return `${hours}:${minutes}`;
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${year}-${month}-${day}, ${hours}:${minutes}`;
};
