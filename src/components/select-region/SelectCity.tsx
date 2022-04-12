import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import APIRoutes from '../../../android/api-service/APIRoutes';
import APIService from '../../../android/api-service/APIService';
import DataMapper from '../DataMapper';
import KeyProviderContext from '../KeyProvider/KeyProviderContext';
import AppTabsContext from '../navigation/AppTabs/AppTabsContext';
import SelectTypeStyle from '../select-transport/SelectStyle';

const City = ({selectCity}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const {selectedRegion} = useContext(AppTabsContext);
  const [openCity, setOpenCity] = useState(false);
  const [valueCity, setValueCity] = useState('');
  const [itemsCity, setItemsCity] = useState<Array<ItemType<ValueType>>>([
    {label: '', value: '0'},
  ]);

  useEffect(() => {
    if (selectedRegion !== '0') {
      APIService.get(APIRoutes.getCities(selectedRegion, keyApi)).then(
        result => {
          if (result) {
            setItemsCity(DataMapper(result.data) as ItemType<ValueType>[]);
          }
        },
      );
      setValueCity('0');
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedRegion !== '0') {
      selectCity(valueCity);
    }
  }, [valueCity]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/city.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        open={openCity}
        value={valueCity}
        items={itemsCity}
        setOpen={setOpenCity}
        setValue={setValueCity}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default City;
