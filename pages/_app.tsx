import '../components/styles/global.css';
import type { AppProps } from 'next/app';
import React from 'react';
import StyledComponentsRegistry from '../components/common/registry';
import Provider from '@/components/common/provider';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <Provider>
      <StyledComponentsRegistry>
        <Component {...pageProps} />
      </StyledComponentsRegistry>
    </Provider>
  );
}

export default MyApp;
