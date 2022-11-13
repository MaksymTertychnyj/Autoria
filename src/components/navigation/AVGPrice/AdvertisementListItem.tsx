import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AVGPriceStyle from './AVGPriceStyle';

const AdvertisementListItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor}]}>
      <View style={AVGPriceStyle.itemResult}>
        <Text style={[AVGPriceStyle.textContainerResult, {color: textColor}]}>
          Id: {item?.classified}, Price: {item?.price.toFixed(0)}$
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdvertisementListItem;
