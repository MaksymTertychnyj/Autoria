import React from 'react';
import KeyProvider from '../KeyProvider/KeyProvider';
import Routes from './Routes';

const Providers = () => {
  return (
    <KeyProvider>
      <Routes />
    </KeyProvider>
  );
};

export default Providers;
