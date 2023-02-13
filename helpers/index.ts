import dayjs from 'dayjs';

const genLongText = () => {
  const starter = 'sdfsd sdf sdgsdg sdf fdf sd fsddsfsdfsdfsd sfd';

  let newV = '';

  for (let i = 0; i < 30; i += 1) {
    newV += starter;
  }

  return newV;
};

export const longText = genLongText();

export const leftZeroIfOneDigit = (num: number) => {
  if (0 <= num && num <= 9) {
    return `0${num}`;
  }

  return `${num}`;
};

export const convertDayjsDateIntoCurrTimezoneString10 = (d: dayjs.Dayjs) => {
  const yearInCurrTimezone = d.year();
  const monthInCurrTimezone = leftZeroIfOneDigit(d.month() + 1);
  const dayInCurrTimezone = leftZeroIfOneDigit(d.date());

  return `${yearInCurrTimezone}-${monthInCurrTimezone}-${dayInCurrTimezone}`;
};

export const generateIsoDateStringsForTodayAndLastNDaysDESC = (n: number) => {
  const newD = dayjs();

  const todayIsoString = convertDayjsDateIntoCurrTimezoneString10(newD);

  const localDatesSet = new Set<string>([todayIsoString]);
  const LocalDatesArrDESC: string[] = [todayIsoString]; // DESC by date

  let currD = newD;

  for (let i = 1; i <= n; i += 1) {
    currD = currD.add(-1, 'day');
    const currIsoString = convertDayjsDateIntoCurrTimezoneString10(currD);

    localDatesSet.add(currIsoString);
    LocalDatesArrDESC.push(currIsoString);
  }

  return {
    localDatesSet,
    LocalDatesArrDESC,
  };
};
