import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import AppTabsContext from '../navigation/AppTabs/AppTabsContext';
import SelectTypeStyle from '../select-transport/SelectStyle';
import mileages from './MileageObjects';

const CarMileage = ({selectMileage}: any) => {
  const {selectedTypeTransport, selectedMark, selectedModel} =
    useContext(AppTabsContext);
  const [openCarMileage, setOpenCarMileage] = useState(false);
  const [valueCarMileage, setValueCarMileage] = useState('0');
  const [itemsCarMileage] = useState<Array<ItemType<ValueType>>>(mileages);

  useEffect(() => {
    setValueCarMileage('0');
  }, [selectedTypeTransport, selectedMark, selectedModel]);

  useEffect(() => {
    selectMileage(valueCarMileage);
  }, [valueCarMileage]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/mileages.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        scrollViewProps={{nestedScrollEnabled: true}}
        open={openCarMileage}
        value={valueCarMileage}
        items={itemsCarMileage}
        setOpen={setOpenCarMileage}
        setValue={setValueCarMileage}
        dropDownDirection="TOP"
      />
    </View>
  );
};

export default CarMileage;
