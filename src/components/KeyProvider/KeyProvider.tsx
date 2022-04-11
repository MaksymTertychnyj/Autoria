import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import KeyProviderContext from './KeyProviderContext';

const KeyProvider = ({children}: any) => {
  const [keyApi, setKeyApi] = useState<string>('');

  useEffect(() => {
    if (keyApi) {
      AsyncStorage.setItem('apiKey', JSON.stringify(keyApi));
    } else {
      AsyncStorage.getItem('apiKey').then(res => {
        if (res) {
          setKeyApi(JSON.parse(res));
        }
      });
    }
  }, [keyApi]);

  return (
    <View style={{flex: 1}}>
      <KeyProviderContext.Provider value={{keyApi, setKeyApi}}>
        {children}
      </KeyProviderContext.Provider>
    </View>
  );
};

export default KeyProvider;
