import { GrandCard } from 'components/GrandCard';
import { HistCard } from 'components/HistCard';
import Button from 'components/old-samples/Button';
import Logo from 'components/old-samples/Logo';
import { generateIsoDateStringsForTodayAndLastNDaysDESC } from 'helpers';
import React, { useCallback, useEffect, useState } from 'react';
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
      date: '2023-01-08',
      description: 'sdfsdfsdfdsf',
      rate: 1,
    },

    {
      date: '2023-01-19',
      description: 'sdfsdfs dfdsf sdfsdf sfd sd',
      rate: 2,
    },

    {
      date: '2023-02-08',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 3,
    },

    {
      date: '2023-02-11',
      description: 'sdfsdfs uuuusf sdfsdf sfd sd',
      rate: 3,
    },
  ],
};

const IndexPage = () => {
  const [dArr, setDArr] = useState<DbSchema['dayArr']>([]);

  const populateDataFromDb = useCallback(() => {
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
    (origDataArrASC: DbSchema['dayArr'], n: number) => {
      const isoDateStringsForTodayAndLastNDays =
        generateIsoDateStringsForTodayAndLastNDaysDESC(n);
      console.log(isoDateStringsForTodayAndLastNDays);

      const origDataArrDESC = (
        JSON.parse(JSON.stringify(origDataArrASC)) as DbSchema['dayArr']
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      const editorial_DataArrASC: DbSchema['dayArr'] = [...origDataArrDESC];

      const mapOfIso10DateToItem = new Map<string, OneDayData>(
        origDataArrDESC.map((day) => {
          return [day.date.slice(0, 10), day];
        }),
      );

      for (const currIsoDate of isoDateStringsForTodayAndLastNDays.isoArrDESC) {
        if (!mapOfIso10DateToItem.has(currIsoDate)) {
          editorial_DataArrASC.push({
            date: currIsoDate,
            description: null,
            rate: null,
          });
        }
      }

      editorial_DataArrASC.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      return editorial_DataArrASC;
    },
    [],
  );

  return (
    <MainPage className="thePage">
      <EditBox>
        <GrandView>
          <GrandCard />
        </GrandView>
      </EditBox>
      <HistBox>
        <HistSlide>
          {dArr.map((day) => {
            return (
              <OneBoxOfSlide key={day.date}>
                <HistCard />
              </OneBoxOfSlide>
            );
          })}
        </HistSlide>
      </HistBox>
    </MainPage>
  );
};

export default IndexPage;
