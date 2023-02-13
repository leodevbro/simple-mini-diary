import TextField from '@mui/material/TextField';
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DivWithAspectRatioFromWidth } from 'components/DivWithAspectRatio/FromWidth';

import dayjs, { Dayjs } from 'dayjs';
import {
  convertDayjsDateIntoCurrTimezoneString10,
  getCoolLocalDateString,
  longText,
} from 'helpers';
import { cla } from 'pages/_app';
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import tw from 'twin.macro';
import { OneDayData } from 'types/main-types';

const MainFrame = styled.div<{
  isEmpty: boolean;
  isLeftMost: boolean;
  isSelected: boolean;
}>`
  /* max-width: calc(min(100%, 700px)); */
  /* min-width: 150px; */
  /* width: calc(40% + 200px); */
  /* height: 200px; */

  position: relative;

  &:hover {
    cursor: pointer;
    z-index: 50;
  }

  width: 100%;
  height: 100%;

  outline: 2px solid rgba(61, 68, 160, 0.644);
  outline-offset: -2px;

  border-radius: 20px;

  /* margin-left: 5%; */
  /* margin-right: 5%; */

  ${({ isSelected }) => {
    if (isSelected) {
      return css`
        outline-width: 5px;
        outline-color: rgb(55, 76, 197);
      `;
    }
  }}

  /* border: 1px solid pink; */

  /* min-height: 300px; */

  padding: 2% 4%;

  ${tw`
    flex
    flex-col
    hocus:(scale-105)

    transform duration-200
  `}

  row-gap: 4px;

  ${({ isEmpty }) => {
    if (isEmpty) {
      return css`
        background-color: gray;
      `;
    }
  }}
`;

const DateFrame = styled.div`
  ${tw`
    flex
  `}
`;

const DateBox = styled.div`
  font-weight: bold;

  ${tw`
    flex
  `}
`;

const DescriptionFrame = styled.div`
  flex-grow: 1;
  padding-right: 38px;

  min-height: 50px;

  /* min-height: 200px; */

  ${tw`
    flex
  `}
`;

const DescriptionBox = styled.div`
  overflow-wrap: anywhere;
  white-space: pre-line;
  word-break: break-all;
  /* border: 1px solid gray; */
  width: 100%;
  text-align: left;

  max-height: 100px;
  overflow-y: scroll;

  background-color: #ffffff22;
  border-radius: 6px;

  padding: 4px;

  ${tw`
    flex
  `}/* &:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  } */
`;

const RateFrame = styled.div`
  ${tw`
    flex
    [justify-content: center]
  `}
`;

const RateGroup = styled.div`
  /* position: relative; */
  width: 70%;
  /* border: 1px solid gray; */
  min-width: 200px;

  ${tw`
    flex
    [justify-content: flex-end]
  `}

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const OneRate = styled.div`
  width: 100%;
  height: 100%;

  color: rgb(4 4 4 / 0.7);

  border: 2px solid rgb(4 4 4 / 0.7);
  border-radius: 300px;

  ${tw`
    flex
    [align-items: center]
    [justify-content: center]
  `}
`;

export const HistCard: FC<{
  dayData: OneDayData;
  currDateStr: null | string;
  setCurrDateStr: Dispatch<SetStateAction<string | null>>;
  currSelectionIndex: null | number;
  dIndex: number;
}> = ({ dayData, currDateStr, setCurrDateStr, currSelectionIndex, dIndex }) => {
  const isEmpty = !dayData.description && !dayData.rate;

  const isForTomorrow =
    convertDayjsDateIntoCurrTimezoneString10(dayjs().add(1, 'day')) ===
    dayData.dateStr;

  const cl_mood = `m${dayData.rate}`;

  const isSelected = dayData.dateStr === currDateStr;

  return (
    <MainFrame
      isEmpty={isEmpty}
      isSelected={isSelected}
      onClick={
        isForTomorrow ? undefined : () => setCurrDateStr(dayData.dateStr)
      }
      className={cla('specialMoodArea', cl_mood)}
      isLeftMost={dIndex === 0}
    >
      <DateFrame>
        <DateBox>
          {getCoolLocalDateString(dayData.dateStr)}{' '}
          {isForTomorrow ? '(ხვალ)' : ''}
        </DateBox>
      </DateFrame>

      <DescriptionFrame>
        <DescriptionBox>{dayData.description}</DescriptionBox>
      </DescriptionFrame>

      <RateFrame>
        <RateGroup>
          <DivWithAspectRatioFromWidth
            widthCss={'15%'}
            widthByHeight={1}
            outerStyle={`width: 15%;`}
          >
            {!isForTomorrow && <OneRate>{dayData.rate}</OneRate>}
          </DivWithAspectRatioFromWidth>
        </RateGroup>
      </RateFrame>
    </MainFrame>
  );
};
