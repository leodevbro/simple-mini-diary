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

const daysOfWeekInGerogianAsSunday0 = [
  'კვირა',
  'ორშაბათი',
  'სამშაბათი',
  'ოთხშაბათი',
  'ხუთშაბათი',
  'პარასკევი',
  'შაბათი',
];

const monthsInGerogianAsJanuary0 = [
  'იანვარი',
  'თებერვალი',
  'მარტი',
  'აპრილი',
  'მაისი',
  'ივნისი',
  'ივლისი',
  'აგვისტო',
  'სექსტემბერი',
  'ოქტომბერი',
  'ნოემბერი',
  'დეკემბერი',
];

export const getLastMonday = (d: dayjs.Dayjs) => {
  const currDayOfWeek = d.day();

  const lastMonday = d.add(
    currDayOfWeek === 0 ? -6 : 1 - currDayOfWeek,
    'days',
  );

  return lastMonday;
};

export const getLastJan1 = (d: dayjs.Dayjs) => {
  return dayjs(`${d.year()}-01-01`);
};

export const getCoolLocalDateString = (isoLocalDateStr: string) => {
  // isoLocalDateStr --> like this: '2019-01-16'
  if (isoLocalDateStr.length > 10) {
    throw new Error('isoLocalDateStr.length is longer than 10 characters');
  }
  const theDate = dayjs(isoLocalDateStr); // here, the '2019-01-16'-like argument will be considered in local time.

  const nowDateRaw = dayjs();
  const nowDate = dayjs(
    `${nowDateRaw.year()}-${nowDateRaw.month() + 1}-${nowDateRaw.date()}`,
  );

  const isInCurrWeekFromLastMonday = theDate >= getLastMonday(nowDate);

  if (isInCurrWeekFromLastMonday) {
    return daysOfWeekInGerogianAsSunday0[theDate.day()];
  } else {
    const isAfterLastJan1 = theDate >= getLastJan1(nowDate);

    if (isAfterLastJan1) {
      return `${theDate.date()} ${monthsInGerogianAsJanuary0[theDate.month()]}`;
    } else {
      return `${theDate.date()} ${
        monthsInGerogianAsJanuary0[theDate.month()]
      }, ${theDate.year()}`;
    }
  }
};
