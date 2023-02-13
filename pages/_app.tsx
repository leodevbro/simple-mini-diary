import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';
import '../styles/glo.scss';

import '../styles/style-of-slider.scss';

import classnames from 'classnames';

export const cla = classnames;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
