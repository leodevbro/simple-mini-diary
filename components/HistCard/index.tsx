import TextField from '@mui/material/TextField';
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DivWithAspectRatioFromWidth } from 'components/DivWithAspectRatio/FromWidth';

import dayjs, { Dayjs } from 'dayjs';
import { longText } from 'helpers';
import { FC, useState } from 'react';
import styled from 'styled-components';

import tw from 'twin.macro';

const MainFrame = styled.div`
  max-width: calc(min(100%, 700px));
  min-width: 150px;
  width: calc(40% + 200px);
  /* height: 200px; */

  margin: auto;

  border: 1px solid pink;

  /* min-height: 300px; */

  padding: 2%;

  ${tw`
    flex
    flex-col
  `}
`;

const DateFrame = styled.div`
  ${tw`
    flex
  `}
`;

const DateBox = styled.div`
  ${tw`
    flex
  `}
`;

const DescriptionFrame = styled.div`
  flex-grow: 1;

  /* min-height: 200px; */

  ${tw`
    flex
  `}
`;

const DescriptionBox = styled.div`
  resize: none;
  border: 1px solid gray;
  width: 100%;

  max-height: 100px;
  overflow-y: scroll;

  ${tw`
    flex
  `}

  &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;

const RateFrame = styled.div`
  ${tw`
    flex
    [justify-content: center]
  `}
`;

const RateGroup = styled.div`
  position: relative;
  width: 70%;
  border: 1px solid gray;
  min-width: 200px;

  ${tw`
    flex
    [justify-content: center]
  `}
`;

const OneRate = styled.div`
  width: 100%;
  height: 100%;

  border: 2px solid black;
  border-radius: 300px;

  ${tw`
    flex
    [align-items: center]
    [justify-content: center]
  `}
`;

export const HistCard: FC<{}> = ({}) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <MainFrame>
      <DateFrame>
        <DateBox>date</DateBox>
      </DateFrame>

      <DescriptionFrame>
        <DescriptionBox>{longText}</DescriptionBox>
      </DescriptionFrame>

      <RateFrame>
        <RateGroup>
          <DivWithAspectRatioFromWidth
            widthCss={'15%'}
            widthByHeight={1}
            outerStyle={`width: 15%; margin: 2%`}
          >
            <OneRate>{7}</OneRate>
          </DivWithAspectRatioFromWidth>
        </RateGroup>
      </RateFrame>
    </MainFrame>
  );
};
