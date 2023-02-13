import dayjs from 'dayjs';

import { DbSchema } from 'types/main-types';

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

export const getNewestSunday = (d: dayjs.Dayjs) => {
  const currDayOfWeek = d.day();

  const newestSunday = d.add(
    currDayOfWeek === 0 ? 0 : 7 - currDayOfWeek,
    'days',
  );

  return newestSunday;
};

export const getLastJan1 = (d: dayjs.Dayjs) => {
  return dayjs(`${d.year()}-01-01`);
};

export const getNewestDec31 = (d: dayjs.Dayjs) => {
  return dayjs(`${d.year()}-12-31`);
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

  const isInCurrWeekFromLastMondayToNewestSunday =
    theDate >= getLastMonday(nowDate) && theDate <= getNewestSunday(nowDate);

  if (isInCurrWeekFromLastMondayToNewestSunday) {
    return daysOfWeekInGerogianAsSunday0[theDate.day()];
  } else {
    const isAfterLastJan1AndBeforeNewestDec31 =
      theDate >= getLastJan1(nowDate) && theDate <= getNewestDec31(nowDate);

    if (isAfterLastJan1AndBeforeNewestDec31) {
      return `${theDate.date()} ${monthsInGerogianAsJanuary0[theDate.month()]}`;
    } else {
      return `${theDate.date()} ${
        monthsInGerogianAsJanuary0[theDate.month()]
      }, ${theDate.year()}`;
    }
  }
};

const getWeekDayDateInCurrWeek = (target: number) => {
  // target --> 0: sunday, 1: monday ......

  const lastMondayInThisWeek = getLastMonday(dayjs());

  let candidateDate: dayjs.Dayjs = lastMondayInThisWeek;

  for (let i = 1; i <= 8; i += 1) {
    if (candidateDate.day() === target) {
      break;
    }
    candidateDate = candidateDate.add(1, 'day');
  }

  return candidateDate;
};

const simpleTestFn = () => {
  console.log('Started simple test');
  const arrOfCorrectOutputs = [
    'ხუთშაბათი',
    '20 დეკემბერი',
    '17 მაისი, 2019',
    '16 ნოემბერი, 2027',
  ];

  const dateOfThursdayInCurrWeek = getWeekDayDateInCurrWeek(4);

  const localIso10StringOfThursdayInCurrWeek = `${dateOfThursdayInCurrWeek.year()}-${
    dateOfThursdayInCurrWeek.month() + 1
  }-${dateOfThursdayInCurrWeek.date()}`;

  const arrOfInputs: string[] = [
    localIso10StringOfThursdayInCurrWeek,
    '2023-12-20',
    '2019-05-17',
    '2027-11-16',
  ];

  let allOutputIsCorrect = true;

  const testResultArr = arrOfInputs.map((x, index) => {
    const res = getCoolLocalDateString(x);
    if (res !== arrOfCorrectOutputs[index]) {
      allOutputIsCorrect = false;
    }
    return res;
  });

  console.log('input:');
  console.log(arrOfInputs);

  console.log('Correct output should be like this:');
  console.log(arrOfCorrectOutputs);
  console.log('Output:');
  console.log(testResultArr);

  console.log('Test passed:', allOutputIsCorrect);

  return testResultArr;
};

simpleTestFn();

// ============================

export const lc_item_name = 'cool_diary_db';

export const getAllDataFromDb = (): DbSchema => {
  const rawData = window.localStorage.getItem(lc_item_name);

  if (!rawData) {
    return {
      dayArr: [],
    };
  } else {
    const parsed = JSON.parse(rawData) as DbSchema;
    return parsed;
  }
};

export const testDbVersion1: DbSchema = {
  dayArr: [
    {
      dateStr: '2020-01-08',
      description: 'sdfsdfsdfdsf',
      rate: 1,
    },
    {
      dateStr: '2023-01-08',
      description: 'sdfsdfsdfdsf',
      rate: 1,
    },

    {
      dateStr: '2023-01-19',
      description: 'sdfsdfs dfdsf sdfsdf sfd sd',
      rate: 2,
    },

    {
      dateStr: '2023-02-08',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 3,
    },

    {
      dateStr: '2023-02-11',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 4,
    },

    {
      dateStr: '2023-02-13',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 4,
    },
  ],
};

const initiateDbWithSampleData = () => {
  window.localStorage.setItem(lc_item_name, JSON.stringify(testDbVersion1));
};

export const updateDb = (newDbRaw: DbSchema) => {
  const newDb: DbSchema = {
    ...newDbRaw,
    dayArr: newDbRaw.dayArr.filter((day) => day.description || day.rate),
  };

  window.localStorage.setItem(lc_item_name, JSON.stringify(newDb));
};
