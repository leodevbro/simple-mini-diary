import { GrandCard } from 'components/GrandCard';
import { HistCard } from 'components/HistCard';
import Button from 'components/old-samples/Button';
import Logo from 'components/old-samples/Logo';
import dayjs from 'dayjs';
import {
  convertDayjsDateIntoCurrTimezoneString10,
  generateIsoDateStringsForTodayAndLastNDaysDESC as generateLocalDateStringsForTodayAndLastNDaysDESC,
} from 'helpers';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { OneDayData, DbSchema } from 'types/main-types';

import { SweetSlider } from 'components/SweetSlider/SweetSlider';
import { cla } from 'pages/_app';
import { getAllDataFromDb } from 'helpers/db-managment';

/*
const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }: { hasBackground: boolean }) => [
    tw`flex flex-col items-center justify-center h-screen`,
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`,
  ],
};

const sampleComp = () => {
  return (
    <div className="ooppp" css={[styles.container({ hasBackground: true })]}>
      <div tw="flex flex-col justify-center h-full gap-y-5 md:accent-amber-50">
        <Button style={{ marginBottom: '900px' }} variant="primary">
          Submit
        </Button>
        <Button variant="secondary">Cancel</Button>
        <Button isSmall>Close</Button>
      </div>
      <Logo />
      <p style={{ fontSize: '1rem' }}>444444444</p>
    </div>
  );
};

*/

const MainPage = styled.div`
  border: 2px solid rgb(179, 214, 149);

  padding-top: 30px;

  background-color: rgba(128, 128, 128, 0.356);

  row-gap: 20px;

  ${tw`
    flex
    flex-col
  `}
`;

const EditBox = styled.div`
  flex-grow: 1;

  ${tw`
    flex
    
  `}
`;

const GrandView = styled.div`
  flex-grow: 1;
  /* border: 2px solid red; */

  ${tw`
    flex
    w-full
  `}
`;

const HistBox = styled.div`
  height: 20%;
  min-height: 150px;

  ${tw`
    flex
    
  `}
`;

const HistSlide = styled.div`
  /* border: 2px solid green; */

  ${tw`
    overflow-x-scroll
    flex
    w-full
  `}
`;

// ------

/*

const dbbbb = window.localStorage.getItem('cool_diary_db');
const objjj = JSON.parse(dbbbb);
console.log(objjj);

*/

// -----------

const IndexPage = () => {
  const dataPopulatedFromDb = useRef(false);
  const [dArr, setDArr] = useState<OneDayData[]>([]);

  const [currDateStr, setCurrDateStr] = useState<null | string>(null);

  // const [currSelectionDateStr, setCurrSelectionDateStr] = useState(
  //   convertDayjsDateIntoCurrTimezoneString10(dayjs()),
  // );

  const populateDataFromDb = useCallback(() => {
    const dbData = getAllDataFromDb();
    const rawArr = dbData.dayArr;

    const initArr = mergeDataArrIntoEmptyLastNDays(rawArr, 7);

    dataPopulatedFromDb.current = true;
    setDArr(initArr);

    if (initArr.length > 0) {
      setCurrDateStr(convertDayjsDateIntoCurrTimezoneString10(dayjs()));
    }
  }, []);

  useEffect(() => {
    const myT = setTimeout(() => {
      populateDataFromDb();
    }, 1000);

    return () => {
      clearInterval(myT);
    };
  }, []);

  const mergeDataArrIntoEmptyLastNDays = useCallback(
    (origDataArrASC: OneDayData[], n: number) => {
      const localDateStringsForTodayAndLastNDays =
        generateLocalDateStringsForTodayAndLastNDaysDESC(n);

      const origDataArrDESC = (
        JSON.parse(JSON.stringify(origDataArrASC)) as OneDayData[]
      ).sort(
        (a, b) => new Date(b.dateStr).getTime() - new Date(a.dateStr).getTime(),
      );

      const editorial_DataArrASC: OneDayData[] = [...origDataArrDESC];

      const mapOfIso10DateToItem = new Map<string, OneDayData>(
        origDataArrDESC.map((day) => {
          return [day.dateStr, day];
        }),
      );

      for (const currLocalDate of localDateStringsForTodayAndLastNDays.LocalDatesArrDESC) {
        if (!mapOfIso10DateToItem.has(currLocalDate)) {
          editorial_DataArrASC.push({
            dateStr: currLocalDate,
            description: null,
            rate: null,
          });
        }
      }

      editorial_DataArrASC.sort(
        (a, b) => new Date(a.dateStr).getTime() - new Date(b.dateStr).getTime(),
      );

      return editorial_DataArrASC;
    },
    [],
  );

  const sliderArr = useMemo(() => {
    if (!dataPopulatedFromDb.current) {
      return [];
    }

    const arr = [...dArr];
    let localDateStrOfTomorrow = convertDayjsDateIntoCurrTimezoneString10(
      dayjs().add(1, 'day'),
    );

    if (dArr.at(-1) && dArr.at(-1)?.dateStr === localDateStrOfTomorrow) {
      localDateStrOfTomorrow = convertDayjsDateIntoCurrTimezoneString10(
        dayjs().add(2, 'days'),
      );
    }

    arr.push({
      description: null,
      rate: null,
      dateStr: localDateStrOfTomorrow,
    });

    return arr;
  }, [dArr]);

  const currIndex = useMemo(() => {
    return sliderArr.findIndex((day) => day.dateStr === currDateStr);
  }, [sliderArr, currDateStr]);

  const cl_mood =
    currIndex >= 0 && sliderArr ? `m${sliderArr[currIndex].rate}` : `m`;

  return (
    <MainPage className={cla('thePage', 'specialMoodArea', cl_mood)}>
      <EditBox>
        <GrandView>
          <GrandCard
            dArr={dArr}
            setDArr={setDArr}
            currDateStr={currDateStr}
            currIndex={currIndex}
          />
        </GrandView>
      </EditBox>
      <HistBox>
        <HistSlide>
          <SweetSlider
            slideItems={sliderArr}
            currDateStr={currDateStr}
            currIndex={currIndex}
            setCurrDateStr={setCurrDateStr}
          />
        </HistSlide>
      </HistBox>
    </MainPage>
  );
};

export default IndexPage;
