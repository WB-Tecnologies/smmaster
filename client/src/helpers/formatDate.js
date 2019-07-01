export const getFormatedDateWithoutYear = date  => {
  const monthNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  const dateObj = new Date(date);

  return `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]}`;
};
