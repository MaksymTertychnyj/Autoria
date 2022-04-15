import {Dimensions, Platform, StyleSheet} from 'react-native';
import Font from '../../../data/fonts/Font';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AVGPriceStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 10,

    //marginTop: 5,
  },
  textResult: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10,
    letterSpacing: 0.25,
    color: '#1520A6',
  },
  containerResult: {
    width: '100%',
    height: Dimensions.get('window').height / 2 - 90,
    alignSelf: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D9DDDC',
  },
  itemResult: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#D9DDDC',
  },
  textContainerResult: {
    marginRight: 20,
    marginTop: 0,
    fontSize: 14,
    //fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#5DBB63',
  },
  containerAdvert: {
    height: Dimensions.get('window').height / 2,
    borderWidth: 1,
    borderColor: '#D9DDDC',
  },
  headerAdvert: {
    justifyContent: 'center',
    marginBottom: 4,
    height: Dimensions.get('window').height / 10,
    borderWidth: 1,
    borderColor: '#D9DDDC',
    elevation: 3,
  },
  textAdvert: {
    color: '#787276',
    fontSize: 12,
    marginTop: HEIGHT / 200,
    marginBottom: HEIGHT / 200,
    marginLeft: 5,
    letterSpacing: 0.25,
  },
});

export default AVGPriceStyle;
