import {Dimensions, Platform, StyleSheet} from 'react-native';

const SelectTypeStyle = StyleSheet.create({
  imageIcon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  dropDownList: {
    flexDirection: 'row',
    width: 270,
    paddingTop: 40,
    alignItems: 'center',
    marginLeft: 20,
  },
});

export default SelectTypeStyle;
