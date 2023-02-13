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
  updateDb,
} from 'helpers';
import { cla } from 'pages/_app';

import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import tw from 'twin.macro';
import { DbSchema, OneDayData } from 'types/main-types';

const MainFrame = styled.div`
  max-width: calc(min(100% - 8px, 700px));
  min-width: 220px;
  width: calc(40% + 200px);
  /* height: 200px; */

  margin: auto;

  border: 2px solid rgb(4 4 4 / 0.8);
  border-radius: clamp(12px, 4vw, 50px);

  /* min-height: 300px; */

  padding: calc(1% + 15px) 2%;

  ${tw`
    flex
    flex-col
  `}

  row-gap: 10px;
`;

const DateFrame = styled.div`
  padding-left: 3%;

  ${tw`
    flex
  `}
`;

const DateBox = styled.div`
  font-size: 1.4rem;
  font-weight: bold;

  ${tw`
    flex
  `}
`;

const DescriptionFrame = styled.div`
  flex-grow: 1;

  min-height: 200px;

  ${tw`
    flex
  `}
`;

const DescriptionBox = styled.textarea`
  background-color: rgba(255, 255, 255, 0.199);
  border-radius: 6px;
  resize: none;
  border: 1px solid gray;
  width: 100%;
  overflow-y: scroll;
  cursor: auto;
  padding: 10px;

  ${tw`
    flex
  `}

  outline: none !important;
  border-color: rgb(113 158 206 / 0);
  box-shadow: 0 0 10px rgb(113 158 206 / 0);

  &:focus {
    outline: none !important;
    border-color: rgb(113 158 206 / 0);
    box-shadow: 0 0 10px rgb(113 158 206 / 0);
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
  /* border: 1px solid gray; */
  min-width: 200px;

  ${tw`
    flex
    [justify-content: center]
  `}
`;

const OneRate = styled.div<{ isChosen: boolean }>`
  width: 100%;
  height: 100%;

  outline: 2px solid rgb(4 4 4 / 0.8);
  border-radius: 300px;

  &:hover {
    cursor: pointer;
  }

  font-size: 150%;

  ${tw`
    flex
    [align-items: center]
    [justify-content: center]

    hocus:(scale-110)

    transform duration-200
  `}

  ${({ isChosen }) => {
    if (isChosen) {
      return css`
        /* background-color: green; */
        outline: 4px solid #0895d6a3;
      `;
    }
  }}
`;

export const GrandCard: FC<{
  dArr: OneDayData[];
  setDArr: React.Dispatch<React.SetStateAction<OneDayData[]>>;
  currDateStr: null | string;
  currIndex: null | number;
}> = ({ dArr, setDArr, currDateStr, currIndex }) => {
  // const [value, setValue] = useState<Dayjs | null>(dayjs());

  const initialized = useRef(false);

  const timerRefForDbUpdate = useRef<NodeJS.Timeout | null>(null);

  const onChangeDescr = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
      const newVal = e.target.value;

      setDArr((prev) => {
        const shallowCopy = [...prev];

        shallowCopy[index] = {
          ...prev[index],
          description: newVal,
        };

        if (timerRefForDbUpdate.current) {
          clearTimeout(timerRefForDbUpdate.current);
        }

        timerRefForDbUpdate.current = setTimeout(() => {
          updateDb({
            dayArr: shallowCopy,
          });
        }, 1000);

        return shallowCopy;
      });
    },
    [],
  );

  const onChangeRate = useCallback(
    (newRate: OneDayData['rate'], index: number) => {
      if (newRate === null) {
        return;
      }

      setDArr((prev) => {
        const shallowCopy = [...prev];

        shallowCopy[index] = {
          ...prev[index],
          rate: newRate,
        };

        if (timerRefForDbUpdate.current) {
          clearTimeout(timerRefForDbUpdate.current);
        }

        timerRefForDbUpdate.current = setTimeout(() => {
          updateDb({
            dayArr: shallowCopy,
          });
        }, 1000);

        return shallowCopy;
      });
    },
    [],
  );

  const rateArr: OneDayData['rate'][] = [1, 2, 3, 4, 5];

  return (
    <MainFrame>
      <DateFrame>
        <DateBox>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pick date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

          {(currDateStr && getCoolLocalDateString(currDateStr)) || 'Date'}
        </DateBox>
      </DateFrame>

      <DescriptionFrame>
        <DescriptionBox
          value={(currIndex !== null && dArr[currIndex]?.description) || ''}
          onChange={
            currIndex !== null ? (e) => onChangeDescr(e, currIndex) : undefined
          }
        />
      </DescriptionFrame>

      <RateFrame>
        <RateGroup>
          {rateArr.map((rate) => {
            // const isChosenRate = rate ===

            const isChosen =
              currIndex !== null &&
              dArr[currIndex] &&
              rate === dArr[currIndex].rate;

            const cl_mood = `m${isChosen ? rate : ''}`;

            return (
              <DivWithAspectRatioFromWidth
                key={rate}
                widthCss={'15%'}
                widthByHeight={1}
                outerStyle={`width: 15%; margin: 2%`}
              >
                <OneRate
                  className={cla('specialMoodArea', cl_mood)}
                  isChosen={isChosen}
                  onClick={
                    currIndex !== null
                      ? () => onChangeRate(rate, currIndex)
                      : undefined
                  }
                >
                  {rate}
                </OneRate>
              </DivWithAspectRatioFromWidth>
            );
          })}
        </RateGroup>
      </RateFrame>
    </MainFrame>
  );
};
