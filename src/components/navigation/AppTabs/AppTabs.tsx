import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import APIRoutes from '../../../../android/api-service/APIRoutes';
import APIService from '../../../../android/api-service/APIService';
import KeyProviderContext from '../../KeyProvider/KeyProviderContext';
import SelectMark from '../../select-transport/SelectMark';
import SelectTypeTransport from '../../select-transport/SelectType';
import AppTabsContext from './AppTabsContext';
import AppTabsStyle from './AppTabsStyle';

const AppTabs = () => {
  const {keyApi} = useContext(KeyProviderContext);

  const [selectedTypeTransport, setSelectedTypeTransport] = useState('0');
  const [selectedMark, setSelectedMarkTransport] = useState('0');
  const [selectedModel, setSelectedModel] = useState('0');
  const [selectedRegion, setSelectedRegion] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedFuel, setSelectedFuel] = useState('0');
  const [selectedKPP, setSelectedKPP] = useState('0');
  const [selectedMinYear, setSelectedMinYear] = useState('');
  const [selectedMaxYear, setSelectedMaxYear] = useState('');
  const [selectedCarMileage, setSelectedCarMileage] = useState('');

  useEffect(() => {
    console.log('type changed: ' + selectedTypeTransport);
  }, [selectedTypeTransport]);

  useEffect(() => {
    console.log('mark changed: ' + selectedMark);
  }, [selectedMark]);

  return (
    <View style={{flex: 1}}>
      <AppTabsContext.Provider
        value={{
          selectedTypeTransport,
          selectedMark,
          selectedModel,
          selectedKPP,
          selectedFuel,
          selectedCarMileage,
          selectedMaxYear,
          selectedMinYear,
          selectedRegion,
          selectedCity,
        }}>
        <View style={AppTabsStyle.header}>
          <Image
            source={require('../../../images/logo_ria.png')}
            style={AppTabsStyle.header}
          />
          <TouchableOpacity
            style={[AppTabsStyle.buttonChangeKey]}
            onPress={() => {}}>
            <Text style={AppTabsStyle.buttonText}>Get Api key</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 60}}>
          <SelectTypeTransport selectType={setSelectedTypeTransport} />
          <SelectMark selectMark={setSelectedMarkTransport} />
        </View>
      </AppTabsContext.Provider>
    </View>
  );
};

export default AppTabs;
