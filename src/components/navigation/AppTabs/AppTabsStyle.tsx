import {Dimensions, Platform, StyleSheet} from 'react-native';
import Font from '../../../data/fonts/Font';

const AppTabsStyle = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
  },
  image: {
    width: '100%',
  },
  imageIcon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 3,
  },
  dropDownList: {
    flexDirection: 'row',
    paddingTop: 30,
    alignSelf: 'center',
  },
  buttonCalculate: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#D80056',
    marginTop: 50,
    alignItems: 'center',
    borderRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: Font.Milliard.Milliard,
    paddingTop: 8,
  },
  buttonChangeKey: {
    marginTop: 30,
    alignSelf: 'flex-end',
    marginRight: 30,
  },
});

export default AppTabsStyle;
