import axios from 'axios';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import APIRoutes from '../../../../android/api-service/APIRoutes';
import APIService from '../../../../android/api-service/APIService';
import KeyProviderContext from '../../KeyProvider/KeyProviderContext';
import CarMileage from '../../select-car-mileage/CarMileage';
import Fuel from '../../select-fuel/SelectFuel';
import Kpp from '../../select-kpp/SelectKpp';
import SelectCity from '../../select-region/SelectCity';
import SelectRegion from '../../select-region/SelectRegion';
import SelectMark from '../../select-transport/SelectMark';
import SelectModel from '../../select-transport/SelectModel';
import SelectTypeTransport from '../../select-transport/SelectType';
import SelectYears from '../../select-years/SelectYears';
import AppTabsContext from './AppTabsContext';
import AppTabsStyle from './AppTabsStyle';

const AppTabs = ({navigation}: any) => {
  const [colorButtonOk, setColorButtonOk] = useState('#f3b2cc');

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
  let sublink: string;

  useEffect(() => {
    selectedModel !== '0'
      ? setColorButtonOk('#D80056')
      : setColorButtonOk('#f3b2cc');
  }, [selectedModel]);

  const AveragePrice = () => {
    sublink = '';
    sublink += '&marka_id=' + selectedMark + '&model_id=' + selectedModel;

    if (selectedMinYear !== '1980') {
      sublink += '& yers=' + selectedMinYear;
    }
    if (selectedMaxYear !== '1980') {
      sublink += '& yers=' + selectedMaxYear;
    }
    if (selectedFuel !== '0') {
      sublink += '&fuel_id=' + selectedFuel;
    }
    if (selectedKPP !== '0') {
      sublink += '&gear_id=' + selectedKPP;
    }
    if (selectedRegion !== '0') {
      sublink += '&region_id=' + selectedRegion;
    }
    if (selectedCity !== '0') {
      sublink += '&city_id=' + selectedCity;
    }
    if (selectedCarMileage !== '0') {
      sublink += '&raceInt=' + '0' + '&raceInt=' + selectedCarMileage;
    }

    navigation.navigate('AVGPrice', {sublink});
  };

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
        <View>
          <ScrollView
            nestedScrollEnabled={true}
            horizontal={false}
            style={{width: '100%'}}>
            <View style={AppTabsStyle.header}>
              <Image
                source={require('../../../images/logo_ria.png')}
                style={AppTabsStyle.header}
              />
            </View>
            <TouchableOpacity
              style={[AppTabsStyle.buttonChangeKey]}
              onPress={() => {
                navigation.navigate('EnterKeyPage');
              }}>
              <Text style={{color: '#63C5DA', fontSize: 14}}>Change key</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'flex-start'}}>
              <SelectTypeTransport selectType={setSelectedTypeTransport} />
              <SelectMark selectMark={setSelectedMarkTransport} />
              <SelectModel selectModel={setSelectedModel} />
              <Kpp selectKpp={setSelectedKPP} />
              <Fuel selectFuel={setSelectedFuel} />
              <CarMileage selectMileage={setSelectedCarMileage} />
              <SelectYears
                selectMinYear={setSelectedMinYear}
                selectMaxYear={setSelectedMaxYear}
              />
              <SelectRegion selectRegion={setSelectedRegion} />
              <SelectCity selectCity={setSelectedCity} />
            </View>
            <TouchableOpacity
              style={[
                AppTabsStyle.buttonCalculate,
                {
                  backgroundColor: colorButtonOk,
                  marginBottom: 50,
                  justifyContent: 'center',
                },
              ]}
              onPress={() => {
                if (selectedModel !== '0') {
                  AveragePrice();
                }
              }}>
              <Text style={AppTabsStyle.buttonText}>Calculate</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </AppTabsContext.Provider>
    </View>
  );
};

export default AppTabs;
