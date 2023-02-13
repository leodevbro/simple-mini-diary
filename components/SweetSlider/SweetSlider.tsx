import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper';

import { cla } from 'pages/_app';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { testDbVersion1 } from 'helpers';
import { OneDayData } from 'types/main-types';
import styled from 'styled-components';
import tw from 'twin.macro';
import { HistCard } from 'components/HistCard';

const OneBoxOfSlide = styled.div`
  /* min-width: 150px;
  max-width: 400px; */
  width: 100%;
  height: 100%;

  /* border: 2px solid blue; */

  ${tw`
    flex
  `}
`;

export const SweetSlider: React.FC<{
  slideItems: OneDayData[];

  leftRightPaddingCss?: string; // clamp(20px, 5%, 96px);
  currDateStr: null | string;
  currIndex: null | number;
  setCurrDateStr: Dispatch<SetStateAction<string | null>>;
}> = ({
  slideItems,

  currDateStr,
  currIndex,
  setCurrDateStr,
}) => {
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={0}
      // pagination={{
      //   clickable: true,
      // }}
      pagination={false}
      modules={[Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      initialSlide={300}
      slidesPerGroup={1}
      loop={false}
      mousewheel={{
        forceToAxis: true,
      }}
      keyboard={true}
    >
      {slideItems.map((day, dIndex) => {
        return (
          <SwiperSlide key={day.dateStr}>
            <OneBoxOfSlide key={day.dateStr}>
              <HistCard
                dayData={day}
                currDateStr={currDateStr}
                setCurrDateStr={setCurrDateStr}
                currSelectionIndex={currIndex}
                dIndex={dIndex}
              />
            </OneBoxOfSlide>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
