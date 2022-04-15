import {StyleSheet} from 'react-native';
import Font from '../../../data/fonts/Font';

const EnterKeyStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },

  image: {
    width: 200,
    height: 150,
    alignSelf: 'center',
  },

  text: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Font.OpenSans.OpenSans,
    letterSpacing: 0.35,
    lineHeight: 30,
  },

  textInput: {
    color: '#787276',
    width: 280,
    height: 50,
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0.35,
    elevation: 0.8,
  },

  buttonGetKey: {
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
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
    fontFamily: Font.Milliard.Milliard,
    justifyContent: 'center',
    //paddingTop: 8,
  },

  buttonOk: {
    width: 40,
    height: 40,
    borderRadius: 6,
    elevation: 6,
    marginTop: 6,
    marginLeft: 15,
  },
});

export default EnterKeyStyles;
