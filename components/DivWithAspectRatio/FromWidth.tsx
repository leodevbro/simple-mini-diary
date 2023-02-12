import { cla } from 'pages/_app';
import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const Ground = styled.div<{ outerStyle: string }>`
  position: relative;
  min-width: 3px;

  ${({ outerStyle }) => {
    if (outerStyle) {
      return css`
        ${outerStyle};
      `;
    }
  }}
`;

const Ground2 = styled.div<{ widthByHeight: number }>`
  position: relative;
  width: 100%;

  /* border: 1px solid green; */

  ${({ widthByHeight }) => {
    if (widthByHeight > 0) {
      return css`
        padding-top: calc(100% / ${widthByHeight});
      `;
    } else {
      return css`
        padding-top: 100%;
      `;
    }
  }}
`;

const Inner = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  /* border: 1px solid yellow; */
`;

export const DivWithAspectRatioFromWidth: FC<{
  widthCss: string;
  widthByHeight: number; // aspect ratio like 1 or 1.8 or 1.9 or .....
  outerClassName?: string;
  innerClassName?: string;
  outerStyle: string;
  // classOfPaddingTop: string; // to manually adjust aspect ratio as percent
  children?: ReactNode;
}> = ({
  outerClassName,
  innerClassName,
  outerStyle,
  // classOfPaddingTop,
  children,
  widthCss,
  widthByHeight,
}) => {
  return (
    <Ground className={cla(outerClassName)} outerStyle={outerStyle}>
      <Ground2 widthByHeight={widthByHeight} className={cla()}>
        <Inner className={cla(innerClassName)}>{children || null}</Inner>
      </Ground2>
    </Ground>
  );
};
