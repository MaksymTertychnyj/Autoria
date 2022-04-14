import {StyleSheet} from 'react-native';
import {Dimensions, Platform} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SliderImageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.4,
  },
});

export default SliderImageStyle;
