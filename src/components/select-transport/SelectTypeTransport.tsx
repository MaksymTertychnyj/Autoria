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
import SelectTypeStyle from './SelectTypeStyle';

const SelectTypeTransport = () => {
  const {keyApi} = useContext(KeyProviderContext);
  const [openTypeTransport, setOpenTypeTransport] = useState(false);
  const [valueTypeTransport, setValueTypeTransport] = useState(null);
  const [itemsTypeTransport, setItemsTypeTransport] = useState<
    Array<ItemType<ValueType>>
  >([{label: '', value: '0'}]);

  useEffect(() => {
    APIService.get(APIRoutes.getTypeTransport(keyApi)).then(result => {
      if (result) {
        setItemsTypeTransport(DataMapper(result.data) as ItemType<ValueType>[]);
      }
    });
  }, []);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/typeTransport.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        open={openTypeTransport}
        value={valueTypeTransport}
        items={itemsTypeTransport}
        setOpen={setOpenTypeTransport}
        setValue={setValueTypeTransport}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default SelectTypeTransport;
