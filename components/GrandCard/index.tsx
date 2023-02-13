import TextField from '@mui/material/TextField';
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DivWithAspectRatioFromWidth } from 'components/DivWithAspectRatio/FromWidth';

import dayjs, { Dayjs } from 'dayjs';
import { convertDayjsDateIntoCurrTimezoneString10, longText } from 'helpers';
import { lc_item_name } from 'pages';
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

import tw from 'twin.macro';
import { DbSchema, OneDayData } from 'types/main-types';

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

  min-height: 200px;

  ${tw`
    flex
  `}
`;

const DescriptionBox = styled.textarea`
  resize: none;
  border: 1px solid gray;
  width: 100%;
  overflow-y: scroll;
  cursor: auto;
  padding: 10px;

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

export const GrandCard: FC<{
  dArr: OneDayData[];
  setDArr: React.Dispatch<React.SetStateAction<OneDayData[]>>;
}> = ({ dArr, setDArr }) => {
  // const [value, setValue] = useState<Dayjs | null>(dayjs());

  const [currDateStr, setCurrDateStr] = useState(
    convertDayjsDateIntoCurrTimezoneString10(dayjs()),
  );

  const currIndex = useMemo(() => {
    return dArr.findIndex((day) => day.dateStr === currDateStr);
  }, [dArr, currDateStr]);

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
          const newDb: DbSchema = {
            dayArr: shallowCopy.filter((day) => day.description || day.rate),
          };

          window.localStorage.setItem(lc_item_name, JSON.stringify(newDb));
        }, 2000);

        return shallowCopy;
      });
    },
    [],
  );

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

          {dArr[currIndex]?.dateStr || 'Date'}
        </DateBox>
      </DateFrame>

      <DescriptionFrame>
        <DescriptionBox
          value={dArr[currIndex]?.description || ''}
          onChange={(e) => onChangeDescr(e, currIndex)}
        />
      </DescriptionFrame>

      <RateFrame>
        <RateGroup>
          {[1, 2, 3, 4, 5].map((rate) => {
            // const isChosenRate = rate ===

            return (
              <DivWithAspectRatioFromWidth
                key={rate}
                widthCss={'15%'}
                widthByHeight={1}
                outerStyle={`width: 15%; margin: 2%`}
              >
                <OneRate>{rate}</OneRate>
              </DivWithAspectRatioFromWidth>
            );
          })}
        </RateGroup>
      </RateFrame>
    </MainFrame>
  );
};
