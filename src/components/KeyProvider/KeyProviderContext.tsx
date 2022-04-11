import React from 'react';

const returnType: any = {};

const KeyProviderContext = React.createContext({
  keyApi: '',
  setKeyApi: (key: string) => returnType,
});

export default KeyProviderContext;
