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

const SelectModel = ({selectModel}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const {selectedTypeTransport, selectedMark} = useContext(AppTabsContext);
  const [openModelTransport, setOpenModelTransport] = useState(false);
  const [valueModelTransport, setValueModelTransport] = useState('');
  const [itemsModelTransport, setItemsModelTransport] = useState<
    Array<ItemType<ValueType>>
  >([{label: '', value: '0'}]);

  useEffect(() => {
    if (selectedTypeTransport !== '0' && selectedMark !== '0') {
      APIService.get(
        APIRoutes.getModelTransport(
          selectedTypeTransport,
          selectedMark,
          keyApi,
        ),
      ).then(result => {
        if (result) {
          setItemsModelTransport(
            DataMapper(result.data) as ItemType<ValueType>[],
          );
        }
      });
      setValueModelTransport('0');
    }
  }, [selectedMark]);

  useEffect(() => {
    if (selectedTypeTransport !== '0' && selectedMark !== '0') {
      selectModel(valueModelTransport);
    }
  }, [valueModelTransport]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/modelTransport.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        open={openModelTransport}
        value={valueModelTransport}
        items={itemsModelTransport}
        setOpen={setOpenModelTransport}
        setValue={setValueModelTransport}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default SelectModel;
