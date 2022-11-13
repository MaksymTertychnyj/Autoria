import React, {useRef, useState, useEffect, SetStateAction} from 'react';
import {View, ImageBackground, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import SliderImageStyle from './SliderImageStyle';
import Spinner from 'react-native-loading-spinner-overlay';

const SliderImage = ({array, loading, onClickNext, onClickPrev}: any) => {
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
            <ImageBackground
              key={e}
              resizeMode="cover"
              style={SliderImageStyle.wrap}
              source={
                e !== '' ? {uri: e} : require('../../images/not_found.jpg')
              }>
              <View style={{flexDirection: 'row'}}>
                <View style={SliderImageStyle.prevButton}>
                  <Button title="prev" onPress={onClickPrev} />
                </View>
                <View style={{flex: 1}}></View>
                <View style={SliderImageStyle.nextButton}>
                  <Button title="next" onPress={onClickNext} />
                </View>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SliderImage;
