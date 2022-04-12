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
import SelectTypeStyle from './SelectStyle';

const SelectMark = ({selectMark}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const {selectedTypeTransport} = useContext(AppTabsContext);
  const [openMarkTransport, setOpenMarkTransport] = useState(false);
  const [valueMarkTransport, setValueMarkTransport] = useState('');
  const [itemsMarkTransport, setItemsMarkTransport] = useState<
    Array<ItemType<ValueType>>
  >([{label: '', value: '0'}]);

  useEffect(() => {
    if (selectedTypeTransport !== '0') {
      APIService.get(
        APIRoutes.getMarkTransport(selectedTypeTransport, keyApi),
      ).then(result => {
        if (result) {
          setItemsMarkTransport(
            DataMapper(result.data) as ItemType<ValueType>[],
          );
        }
      });
      setValueMarkTransport('0');
    }
  }, [selectedTypeTransport]);

  useEffect(() => {
    if (selectedTypeTransport !== '0') {
      selectMark(valueMarkTransport);
    }
  }, [valueMarkTransport]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/markTransport.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        open={openMarkTransport}
        value={valueMarkTransport}
        items={itemsMarkTransport}
        setOpen={setOpenMarkTransport}
        setValue={setValueMarkTransport}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default SelectMark;
