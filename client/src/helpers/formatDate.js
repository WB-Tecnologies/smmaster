export const getFormatedDate = date => {
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const dateObj = new Date(date);

  return `${monthNames[dateObj.getMonth()]}  ${dateObj.getFullYear()}`;
};
