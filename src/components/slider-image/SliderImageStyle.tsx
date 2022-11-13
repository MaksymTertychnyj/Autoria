import {StyleSheet} from 'react-native';
import {Dimensions, Platform} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SliderImageStyle = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 5,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
    alignSelf: 'center',
  },
  prevButton: {
    marginLeft: 10,
    marginTop: HEIGHT * 0.33,
    opacity: 0.5,
  },
  nextButton: {
    marginRight: 10,
    marginTop: HEIGHT * 0.33,
    opacity: 0.5,
  },
});

export default SliderImageStyle;
