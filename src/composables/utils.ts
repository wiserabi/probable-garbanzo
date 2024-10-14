export const numToCommaString = (n: number) => {
  if (n >= 1000 || n <= -1000) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return n.toString();
  }
};

export const datetimeToyymmdd = (dt: string) => {
  let date;
  if (dt) {
    date = new Date(dt);
  } else {
    date = new Date();
  }

  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}.${month}.${day}`;
};

export const datetimeToyymmddByDate = (date: Date) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}.${month}.${day}`;
};

export const datetimeToyyyymmddByDate = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}.${month}.${day}`;
};

export const calculateMonthsBetween = (startDate: Date, endDate: Date) => {
  const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = endDate.getMonth() - startDate.getMonth();

  return yearsDiff * 12 + monthsDiff + 1;
};

export const getLastDayOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDayDate = new Date(year, month + 1, 0); // 다음 달 0일 = 현재 월의 마지막 날
  return lastDayDate.getDate();
};
