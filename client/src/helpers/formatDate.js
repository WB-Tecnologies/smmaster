import '@/helpers/polifills';

export const getShortDayLongMonth = date => {
  const dateObj = new Date(date);

  return `${dateObj.getDate()} ${dateObj.toLocaleString('ru', { month: 'long' })}`;
};

export const getLongMonthName = date => {
  const dateObj = new Date(date);

  return `${dateObj.toLocaleString('ru', { month: 'long' })}`;
};

export const getShortDayLongWeekday = date => {
  const dateObj = new Date(date);

  return `${dateObj.getDate()}, ${dateObj.toLocaleString('ru', { weekday: 'long' })}`;
};

export const getTime = date => (
  `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
);

export const getFullDateLongWeekday = date => {
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

  return `${day}.${month}.${year}, ${dateObj.toLocaleString('ru', { weekday: 'short' })}`;
};
