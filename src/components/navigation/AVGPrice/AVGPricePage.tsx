import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AVGPriceStyle from './AVGPriceStyle';

const AVGPricePage = ({navigation, route}: any) => {
  const {sublink} = route.params;
  useEffect(() => {
    console.log(sublink);
  }, [sublink]);

  return (
    <View style={AVGPriceStyle.container}>
      <Text>From avgPrice</Text>
    </View>
  );
};

export default AVGPricePage;
