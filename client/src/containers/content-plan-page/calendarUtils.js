/* eslint-disable import/prefer-default-export */
export const calendarUtils = {
  getPrevDay: day => (new Date(day.setDate(day.getDate() - 1))),
  getNextDay: day => (new Date(day.setDate(day.getDate() + 1))),
  getFirstDayForMonth: currentMonth => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);

    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1);
    }

    return firstDay;
  },
  getLastDayForMonth: currentMonth => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    while (lastDay.getDay() !== 0) {
      lastDay.setDate(lastDay.getDate() + 1);
    }

    return lastDay;
  },
  getAllDatesOfMonth: currentMonth => {
    const result = [];
    const firstDay = calendarUtils.getFirstDayForMonth(currentMonth);
    const lastDay = calendarUtils.getLastDayForMonth(currentMonth);

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      result.push(new Date(day));
    }

    return result;
  },
  getAllDatesOfMonthStartFromToday: currentMonth => {
    const result = [];
    const lastDay = calendarUtils.getLastDayForMonth(currentMonth);

    for (let day = currentMonth; day <= lastDay; day.setDate(day.getDate() + 1)) {
      result.push(new Date(day));
    }

    return result;
  },
};
