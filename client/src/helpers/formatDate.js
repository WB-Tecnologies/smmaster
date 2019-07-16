export const getFormatedDateWithoutYear = date => {
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

  return `${monthNames[dateObj.getMonth()]}`;
};

export const getDayWithWeekdayName = date => {
  const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  const dateObj = new Date(date);

  return `${dateObj.getDate()}, ${weekdays[dateObj.getDay()]}`;
};
