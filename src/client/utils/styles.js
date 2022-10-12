import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    overflow-x: hidden;
    font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Modern Warfare", Arial, Helvetica, sans-serif;
  }
`;

export const breakpoints = {
  xs: '0px',
  s: '800px',
  m: '1000px',
  l: '1400px',
  xl: '1600px',
  xxl: '2000px',
};

export const mq = {
  gtxs: `@media all and (min-width: ${breakpoints.xs})`,
  gts: `@media all and (min-width: ${breakpoints.s})`,
  gtm: `@media all and (min-width: ${breakpoints.m})`,
  gtl: `@media all and (min-width: ${breakpoints.l})`,
  gtxl: `@media all and (min-width: ${breakpoints.xl})`,
  gtxxl: `@media all and (min-width: ${breakpoints.xxl})`,
  ltxs: `@media all and (max-width: ${breakpoints.xs})`,
  lts: `@media all and (max-width: ${breakpoints.s})`,
  ltm: `@media all and (max-width: ${breakpoints.m})`,
  ltl: `@media all and (max-width: ${breakpoints.l})`,
  ltxl: `@media all and (max-width: ${breakpoints.xl})`,
  ltxxl: `@media all and (max-width: ${breakpoints.xxl})`,
};

export const defaultContainerMargins = css`
  ${mq.gtxs} {
    margin-left: 20px;
    margin-right: 20px;
  }

  ${mq.gts} {
    margin-left: 160px;
    margin-right: 160px;
  }

  ${mq.gtm} {
    margin-left: 200px;
    margin-right: 200px;
  }

  ${mq.gtl} {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
  }

  ${mq.gtxl} {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const colors = {
  PINK: '#ffadde',
};
