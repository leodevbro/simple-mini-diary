import { getCoolLocalDateString } from 'helpers';
import { FC } from 'react';
import { OneDayData } from 'types/main-types';

export const GrandCard: FC<{
  currDateStr: null | string;
}> = ({ currDateStr }) => {
  return (
    <div data-testid="dateBoxOfEditor">
      {(currDateStr && getCoolLocalDateString(currDateStr)) || 'Date'}
    </div>
  );
};
