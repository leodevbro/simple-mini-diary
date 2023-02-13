import { render } from '@testing-library/react';

import { GrandCard } from './proxy.tsx';

import { getWeekDayDateInCurrWeek } from '../../helpers/index.ts';

// testId of date text element: 'dateBoxOfEditor'

describe(GrandCard, () => {
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

  const arrOfInputs = [
    localIso10StringOfThursdayInCurrWeek,
    '2023-12-20',
    '2019-05-17',
    '2027-11-16',
  ];

  // ----

  for (let i = 0; i < arrOfInputs.length; i += 1) {
    it('displays correct date', () => {
      const { getByTestId } = render(
        <GrandCard currDateStr={arrOfInputs[i]} />,
      );

      const currDateStrG = getByTestId('dateBoxOfEditor').textContent;

      expect(currDateStrG).toEqual(arrOfCorrectOutputs[i]);
    });
  }
});
