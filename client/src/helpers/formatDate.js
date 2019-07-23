import '@/helpers/polifills';

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

export const getTime = date => (
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
);

// Date format: 'dd.mm.yyyy, short weekday hh:mm'
export const getDayWithTime = date => {
  const weekdays = ['вc', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const dateObj = new Date(date);

  let day = dateObj.getDate();
  let month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}.${month}.${year}, ${weekdays[dateObj.getDay()]}`;
};
