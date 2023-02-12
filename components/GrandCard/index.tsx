import TextField from '@mui/material/TextField';
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DivWithAspectRatioFromWidth } from 'components/DivWithAspectRatio/FromWidth';


import dayjs, { Dayjs } from 'dayjs';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { longText } from 'styles/GlobalStyles';
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

export const GrandCard: FC<{}> = ({}) => {
  // const [value, setValue] = useState<Dayjs | null>(dayjs());

  const [descr, setDescr] = useState(longText);

  const onChangeDescr: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const newVal = e.target.value;
    setDescr(newVal);
  }, []);

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

          date
        </DateBox>
      </DateFrame>

      <DescriptionFrame>
        <DescriptionBox value={descr} onChange={onChangeDescr} />
      </DescriptionFrame>

      <RateFrame>
        <RateGroup>
          {[1, 2, 3, 4, 5].map((rate) => {
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
