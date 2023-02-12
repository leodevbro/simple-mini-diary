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

export const generateIsoDateStringsForTodayAndLastNDaysDESC = (n: number) => {
  const newD = dayjs();

  const todayIsoString = newD.toISOString().slice(0, 10);

  const isoSet = new Set<string>([todayIsoString]);
  const isoArr: string[] = [todayIsoString]; // DESC by date

  let currD = newD;

  for (let i = 1; i <= n; i += 1) {
    currD = currD.add(-1, 'day');
    const currIsoString = currD.toISOString().slice(0, 10);

    isoSet.add(currIsoString);
    isoArr.push(currIsoString);
  }

  return {
    isoSet,
    isoArrDESC: isoArr,
  };
};
