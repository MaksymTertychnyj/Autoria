import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import APIRoutes from '../../../android/api-service/APIRoutes';
import APIService from '../../../android/api-service/APIService';
import DataDropDownList from '../../../android/models/DTO/DataDropDownList';
import DataMapper from '../DataMapper';
import KeyProviderContext from '../KeyProvider/KeyProviderContext';
import SelectTypeStyle from '../select-transport/SelectStyle';

const Fuel = ({selectFuel}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const [openFuel, setOpenFuel] = useState(false);
  const [valueFuel, setValueFuel] = useState('0');
  const [itemsFuel, setItemsFuel] = useState<Array<ItemType<ValueType>>>([
    {label: '', value: '0'},
  ]);

  useEffect(() => {
    APIService.get(APIRoutes.getFuelType(keyApi)).then(result => {
      if (result) {
        setItemsFuel(DataMapper(result.data) as ItemType<ValueType>[]);
      }
    });
  }, []);

  useEffect(() => {
    selectFuel(valueFuel);
  }, [valueFuel]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/fuelType.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        open={openFuel}
        value={valueFuel}
        items={itemsFuel}
        setOpen={setOpenFuel}
        setValue={setValueFuel}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default Fuel;
