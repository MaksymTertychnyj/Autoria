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

const SelectRegion = ({selectRegion}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const [openRegion, setOpenRegion] = useState(false);
  const [valueRegion, setValueRegion] = useState('0');
  const [itemsRegion, setItemsRegion] = useState<Array<ItemType<ValueType>>>([
    {label: '', value: '0'},
  ]);

  useEffect(() => {
    APIService.get(APIRoutes.getRegion(keyApi)).then(result => {
      if (result) {
        setItemsRegion(DataMapper(result.data) as ItemType<ValueType>[]);
      }
    });
  }, []);

  useEffect(() => {
    selectRegion(valueRegion);
  }, [valueRegion]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/region.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        open={openRegion}
        value={valueRegion}
        items={itemsRegion}
        setOpen={setOpenRegion}
        setValue={setValueRegion}
        dropDownDirection="TOP"
        searchable={true}
      />
    </View>
  );
};

export default SelectRegion;
