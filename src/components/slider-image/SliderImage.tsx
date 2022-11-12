import React, {useRef, useState, useEffect, SetStateAction} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SliderImageStyle from './SliderImageStyle';
import Spinner from 'react-native-loading-spinner-overlay';

const SliderImage = ({array, loading}: any) => {
  const images: string[] = array;

  const onChange = ({nativeEvent}: any) => {};

  return (
    <SafeAreaView style={SliderImageStyle.container}>
      <View style={SliderImageStyle.wrap}>
        <Spinner visible={loading} textStyle={{color: '#FFF'}} />
        <ScrollView
          onScroll={({nativeEvent}) => onChange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={SliderImageStyle.wrap}>
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode="cover"
              style={SliderImageStyle.wrap}
              source={
                e !== '' ? {uri: e} : require('../../images/not_found.jpg')
              }
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SliderImage;
