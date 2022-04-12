import React from 'react';

const returnType: any = {};

const AppTabsContext = React.createContext({
  selectedTypeTransport: '0',
  selectedMark: '0',
  selectedModel: '0',
  selectedRegion: '0',
  selectedCity: '0',
  selectedFuel: '0',
  selectedKPP: '0',
  selectedMinYear: '',
  selectedMaxYear: '',
  selectedCarMileage: '',
});

export default AppTabsContext;
