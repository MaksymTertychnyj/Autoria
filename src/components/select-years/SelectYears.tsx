import {arrIndexOf} from '@microsoft/applicationinsights-core-js';
import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import AppTabsContext from '../navigation/AppTabs/AppTabsContext';
import SelectTypeStyle from '../select-transport/SelectStyle';
import years from './YearObjects';

const SelectYears = ({selectMinYear, selectMaxYear}: any) => {
  const {selectedMinYear, selectedMaxYear} = useContext(AppTabsContext);
  const [openMinYear, setOpenMinYear] = useState(false);
  const [valueMinYear, setValueMinYear] = useState('1980');
  const [itemsMinYear] = useState<Array<ItemType<ValueType>>>(years);
  const [openMaxYear, setOpenMaxYear] = useState(false);
  const [valueMaxYear, setValueMaxYear] = useState('0');
  const [itemsMaxYear] = useState<Array<ItemType<ValueType>>>(years);

  useEffect(() => {
    setValueMaxYear(valueMinYear);
  }, [selectedMinYear]);

  useEffect(() => {
    selectMinYear(valueMinYear);
  }, [valueMinYear]);

  useEffect(() => {
    selectMaxYear(valueMaxYear);
  }, [valueMaxYear]);

  return (
    <View style={SelectTypeStyle.dropDownList}>
      <Image
        source={require('../../images/year.png')}
        style={SelectTypeStyle.imageIcon}
      />
      <View style={{width: 100, marginLeft: 20}}>
        <DropDownPicker
          open={openMinYear}
          value={valueMinYear}
          items={itemsMinYear}
          setOpen={setOpenMinYear}
          setValue={setValueMinYear}
          dropDownDirection="TOP"
        />
      </View>
      <View style={{width: 100, marginLeft: 30}}>
        <DropDownPicker
          open={openMaxYear}
          value={valueMaxYear}
          items={itemsMaxYear}
          setOpen={setOpenMaxYear}
          setValue={setValueMaxYear}
          dropDownDirection="TOP"
        />
      </View>
    </View>
  );
};

export default SelectYears;
