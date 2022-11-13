import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Linking, Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import APIRoutes from '../../../../android/api-service/APIRoutes';
import APIService from '../../../../android/api-service/APIService';
import DataResponse from '../../../../android/models/DTO/DataResponse';
import ModelAdvertisement from '../../../../android/models/ModelAdvertisement';
import ResponseAVG from '../../../../android/models/ResponseAVG';
import ResponseMapper from '../../data-mappers/ResponseMapper';
import KeyProviderContext from '../../KeyProvider/KeyProviderContext';
import AVGPriceStyle from './AVGPriceStyle';
import SliderImage from '../../slider-image/SliderImage';
import Spinner from 'react-native-loading-spinner-overlay';
import AdvertisementListItem from './AdvertisementListItem';

const AVGPricePage = ({navigation, route}: any) => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const {keyApi} = useContext(KeyProviderContext);
  const [response, setResponse] = useState<ResponseAVG>(null);
  const [dataList, setDataList] = useState<DataResponse[]>();
  const [advertisement, setAdvertisement] = useState<ModelAdvertisement>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const {sublink} = route.params;
  const url = 'https://auto.ria.com/uk';

  const renderItem = ({item}: any) => {
    return (
      <AdvertisementListItem
        item={item}
        onPress={() => setSelectedItem(item.classified)}
        backgroundColor={
          item.classified === selectedItem ? '#6e3b6e' : '#f9c2ff'
        }
        textColor={item.classified === selectedItem ? 'white' : 'black'}
      />
    );
  };

  const openUrl = () => {
    Linking.openURL(url + advertisement?.linkToView).catch((err: any) =>
      console.error("Couldn't load page", err),
    );
  };

  useEffect(() => {
    loadAverageData();
  }, [sublink]);

  useEffect(() => {
    if (selectedItem) {
      loadAdvertisementData();
    }
  }, [selectedItem]);

  async function loadAdvertisementData() {
    try {
      setLoadingItem(true);
      const result = await APIService.get(
        APIRoutes.getResponseAdvertisement(selectedItem!.toString(), keyApi),
      );
      setAdvertisement(result.data);
    } catch (e) {
      console.error('failed to load advertisement data');
    } finally {
      setLoadingItem(false);
    }
  }

  async function loadAverageData() {
    try {
      setLoadingPage(true);
      const result = await APIService.get(
        APIRoutes.getRequestAVG(sublink, keyApi),
      );
      setResponse(result.data);
      setDataList(ResponseMapper(result.data));
      setSelectedItem(result.data.classifieds[0]);
    } catch (e) {
      console.error('failed to load average data');
    } finally {
      setLoadingPage(false);
    }
  }

  function onClickNext() {
    if (response && selectedItem) {
      const currentIndex = response.classifieds?.indexOf(
        selectedItem,
      ) as number;

      const nextItem = response.classifieds![currentIndex + 1];
      if (nextItem) {
        setSelectedItem(nextItem);
      }
    }
  }

  function onClickPrev() {
    if (response && selectedItem) {
      const currentIndex = response.classifieds?.indexOf(
        selectedItem,
      ) as number;

      const prevItem = response.classifieds![currentIndex - 1];
      if (prevItem) {
        setSelectedItem(prevItem);
      }
    }
  }

  return (
    <View style={AVGPriceStyle.container}>
      <Spinner
        visible={loadingPage}
        textContent={'Loading ...'}
        textStyle={{color: '#FFF'}}
      />
      <View style={[AVGPriceStyle.header]}>
        <Text style={[AVGPriceStyle.textResult, {marginLeft: 0}]}>Total:</Text>
        <Text style={AVGPriceStyle.textResult}>{response?.total + ','}</Text>
        <Text style={[AVGPriceStyle.textResult, {marginLeft: 20}]}>
          Average price:
        </Text>
        <Text style={AVGPriceStyle.textResult}>
          {response?.arithmeticMean?.toFixed(2)} $
        </Text>
      </View>

      <SafeAreaView style={AVGPriceStyle.containerAdvert}>
        <TouchableOpacity onPress={openUrl}>
          <View style={[AVGPriceStyle.headerAdvert]}>
            <View style={[AVGPriceStyle.header]}>
              <Text style={[AVGPriceStyle.textAdvert, {fontWeight: 'bold'}]}>
                City:
              </Text>
              <Text style={AVGPriceStyle.textAdvert}>
                {(advertisement ? advertisement?.locationCityName : '') + ','}
              </Text>
              <Text style={AVGPriceStyle.textAdvert}>
                {(advertisement ? advertisement?.stateData?.regionName : '') +
                  ' ' +
                  'обл.'}
              </Text>
            </View>
            <View style={[AVGPriceStyle.header]}>
              <Text
                style={[
                  AVGPriceStyle.textAdvert,
                  {marginLeft: 5, fontWeight: 'bold'},
                ]}>
                Year:
              </Text>
              <Text style={AVGPriceStyle.textAdvert}>
                {advertisement?.autoData?.year as any}
              </Text>
              <Text
                style={[
                  AVGPriceStyle.textAdvert,
                  {marginLeft: 10, fontWeight: 'bold'},
                ]}>
                Race:
              </Text>
              <Text style={AVGPriceStyle.textAdvert}>
                {advertisement?.autoData?.race as any}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <SliderImage
          array={advertisement ? [advertisement.photoData?.seoLinkB] : ['']}
          loading={loadingItem}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </SafeAreaView>
      <SafeAreaView>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={false}
          style={AVGPriceStyle.containerResult}>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            extraData={selectedItem}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AVGPricePage;
