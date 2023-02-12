import { GrandCard } from 'components/GrandCard';
import Button from 'components/old-samples/Button';
import Logo from 'components/old-samples/Logo';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

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
  width: 200px;
  height: 200px;

  border: 2px solid blue;

  ${tw`
    flex
  `}
`;

const IndexPage = () => {
  return (
    <MainPage className="thePage">
      <EditBox>
        <GrandView>
          <GrandCard />
        </GrandView>
      </EditBox>
      <HistBox>
        <HistSlide>
          {[1, 2, 3, 4, 5, 6, 7].map((x) => {
            return <OneBoxOfSlide key={x}>x</OneBoxOfSlide>;
          })}
        </HistSlide>
      </HistBox>
    </MainPage>
  );
};

export default IndexPage;
