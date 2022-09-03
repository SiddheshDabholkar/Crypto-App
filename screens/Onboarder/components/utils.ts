export const percentageDifference = (a: number, b: number): number => {
  const dif: number = +a - +b;
  const avg: number = (+a + +b) / 2;
  const div: number = Math.abs(+dif / +avg);
  return div;
};
