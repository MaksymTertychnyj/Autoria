import React, {useContext, useEffect, useState} from 'react';
import {Linking, Text, View} from 'react-native';
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

const AVGPricePage = ({navigation, route}: any) => {
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const {keyApi} = useContext(KeyProviderContext);
  const [response, setResponse] = useState<ResponseAVG>(null);
  const [dataList, setDataList] = useState<DataResponse[]>();
  const [advertisement, setAdvertisement] = useState<ModelAdvertisement>(null);
  const [selectedId, setSelectedId] = useState(null);
  const {sublink} = route.params;
  const url = 'https://auto.ria.com/uk';

  const renderItem = ({item}: any) => {
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.classified)}
        backgroundColor={item.classified === selectedId ? '#6e3b6e' : '#f9c2ff'}
        textColor={item.classified === selectedId ? 'white' : 'black'}
      />
    );
  };

  const openUrl = () => {
    Linking.openURL(url + advertisement?.linkToView).catch((err: any) =>
      console.error("Couldn't load page", err),
    );
  };

  useEffect(() => {
    setLoadingPage(true);
    APIService.get(APIRoutes.getRequestAVG(sublink, keyApi)).then(
      (result: {data: ResponseAVG}) => {
        if (result) {
          setResponse(result.data);
        }
        setLoadingPage(false);
      },
    );
  }, [sublink]);

  useEffect(() => {
    if (response) {
      setDataList(ResponseMapper(response));
    }
  }, [response]);

  useEffect(() => {
    if (selectedId) {
      setLoadingItem(true);
      APIService.get(
        APIRoutes.getResponseAdvertisement(selectedId, keyApi),
      ).then((result: {data: ModelAdvertisement}) => {
        if (result) {
          setAdvertisement(result.data);
        }
        setLoadingItem(false);
      });
    }
  }, [selectedId]);

  const Item = ({item, onPress, backgroundColor, textColor}: any) => (
    <TouchableOpacity onPress={onPress} style={[{backgroundColor}]}>
      <View style={AVGPriceStyle.itemResult}>
        <Text style={[AVGPriceStyle.textContainerResult, {color: textColor}]}>
          Id:
        </Text>
        <Text style={AVGPriceStyle.textContainerResult}>
          {item?.classified},
        </Text>
        <Text style={[AVGPriceStyle.textContainerResult, {color: textColor}]}>
          Price:
        </Text>
        <Text style={AVGPriceStyle.textContainerResult}>
          {item?.price.toFixed(0)}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
            keyExtractor={item => item?.classified as any}
            extraData={selectedId}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AVGPricePage;
