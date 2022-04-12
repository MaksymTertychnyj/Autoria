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
import AppTabsContext from '../navigation/AppTabs/AppTabsContext';
import SelectTypeStyle from '../select-transport/SelectStyle';

const Kpp = ({selectKpp}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const {selectedTypeTransport} = useContext(AppTabsContext);
  const [openKpp, setOpenKpp] = useState(false);
  const [valueKpp, setValueKpp] = useState('0');
  const [itemsKpp, setItemsKpp] = useState<Array<ItemType<ValueType>>>([
    {label: '', value: '0'},
  ]);

  useEffect(() => {
    if (selectedTypeTransport !== '0') {
      APIService.get(APIRoutes.getKPPtype(keyApi, selectedTypeTransport)).then(
        result => {
          if (result) {
            setItemsKpp(DataMapper(result.data) as ItemType<ValueType>[]);
          }
        },
      );
    }
  }, [selectedTypeTransport]);

  useEffect(() => {
    if (selectedTypeTransport !== '0') {
      selectKpp(valueKpp);
    }
  }, [valueKpp]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/kppType.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        open={openKpp}
        value={valueKpp}
        items={itemsKpp}
        setOpen={setOpenKpp}
        setValue={setValueKpp}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default Kpp;
