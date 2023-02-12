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
  ${tw`
    flex
    flex-col
  `}
`;

const EditBox = styled.div`
  flex-grow: 1;

  ${tw`
    flex
    border-4
    border-amber-300
  `}
`;

const GrandView = styled.div`
  flex-grow: 1;
  border: 2px solid red;
  ${tw`
    flex
    w-full
  `}
`;

const HistBox = styled.div`
  ${tw`
    flex
    border-4
    border-amber-600
  `}
`;

const HistSlide = styled.div`
  border: 2px solid green;

  ${tw`
    overflow-x-scroll
    flex
    w-full
  `}
`;

const OneBoxOfSlide = styled.div`
  min-width: 150px;
  max-width: 400px;
  width: 200px;
  height: 200px;

  border: 2px solid blue;

  ${tw`
    flex
  `}
`;

const testDbVersion1: DbSchema = {
  dayArr: [
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
  ],
};

const IndexPage = () => {
  const dataPopulatedFromDb = useRef(false);
  const [dArr, setDArr] = useState<DbSchema['dayArr']>([]);

  const populateDataFromDb = useCallback(() => {
    dataPopulatedFromDb.current = true;
    setDArr(testDbVersion1.dayArr);
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
      console.log(localDateStringsForTodayAndLastNDays);

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

  const finalArrOfDays = useMemo(() => {
    if (!dataPopulatedFromDb.current) {
      return [];
    }
    const initArr = mergeDataArrIntoEmptyLastNDays(dArr, 7);

    const localDateStrOfTomorrow = convertDayjsDateIntoCurrTimezoneString10(
      dayjs().add(1, 'day'),
    );

    initArr.push({
      description: null,
      rate: null,
      dateStr: localDateStrOfTomorrow,
    });

    return initArr;
  }, [dArr]);

  return (
    <MainPage className="thePage">
      <EditBox>
        <GrandView>
          <GrandCard />
        </GrandView>
      </EditBox>
      <HistBox>
        <HistSlide>
          {finalArrOfDays.map((day) => {
            return (
              <OneBoxOfSlide key={day.dateStr}>
                <HistCard dayData={day} />
              </OneBoxOfSlide>
            );
          })}
        </HistSlide>
      </HistBox>
    </MainPage>
  );
};

export default IndexPage;
