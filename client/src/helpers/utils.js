export const splitArray = (array, elementsPerSubArray) => {
  const res = [[]];
  let elementInSubCount = 0;

  for (let idx = 0; idx < array.length; ++idx) {
    if (elementInSubCount === elementsPerSubArray) {
      res.push([]);
      elementInSubCount = 0;
    }
    res[res.length - 1].push(array[idx]);
    elementInSubCount += 1;
  }
  return res;
};

export const getZeroDate = date => new Date(date).setHours(0, 0, 0, 0);
