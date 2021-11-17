export const haveCollisions = (
  boundaries1: number[],
  boundaries2: number[]
) => {
  const [left1, top1, right1, bottom1] = boundaries1;
  const [left2, top2, right2, bottom2] = boundaries2;

  return (
    right1 >= left2 && left1 <= right2 && bottom1 >= top2 && top1 <= bottom2
  );
};
