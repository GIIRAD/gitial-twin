import * as React from 'react';
import { OrbitProvider } from '@kiwicom/orbit-components';
import { useUID } from 'react-uid';
import getTokens from '@kiwicom/orbit-components/lib/getTokens';

const customTokens = getTokens({
  palette: {
    product: {
      light: '#003E65',
      lightHover: '#003E65',
      lightActive: '#003E65',
      normal: '#003E65',
      normalHover: '#003E65',
      normalActive: '#003E65',
      dark: '#003E65',
    },
  },
});

export default function Provider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[],
}): JSX.Element {
  const uid = useUID();
  return (
    <OrbitProvider
      theme={{
        orbit: customTokens,
        rtl: false,
        transitions: false,
        lockScrolling: false,
      }}
      useId={() => uid}
    >
      {children}
    </OrbitProvider>
  );
}
