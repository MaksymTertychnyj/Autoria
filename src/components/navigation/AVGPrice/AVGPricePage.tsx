import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ObjectType} from 'typescript';
import APIRoutes from '../../../../android/api-service/APIRoutes';
import APIService from '../../../../android/api-service/APIService';
import DataResponse from '../../../../android/models/DTO/DataResponse';
import ModelAdvertisement from '../../../../android/models/ModelAdvertisement';
import ResponseAVG from '../../../../android/models/ResponseAVG';
import ResponseMapper from '../../data-mappers/ResponseMapper';
import KeyProviderContext from '../../KeyProvider/KeyProviderContext';
import AVGPriceStyle from './AVGPriceStyle';

const AVGPricePage = ({navigation, route}: any) => {
  const {keyApi} = useContext(KeyProviderContext);
  const [response, setResponse] = useState<ResponseAVG>(null);
  const [dataList, setDataList] = useState<DataResponse[]>();
  const [advertisement, setAdvertisement] = useState<ModelAdvertisement>(null);
  const [selectedId, setSelectedId] = useState(null);
  const {sublink} = route.params;

  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [race, setRace] = useState('');

  const renderItem = ({item}: any) => {
    return <Item item={item} onPress={() => setSelectedId(item.classified)} />;
  };

  useEffect(() => {
    APIService.get(APIRoutes.getRequestAVG(sublink, keyApi)).then(result => {
      if (result) {
        setResponse(result.data as ResponseAVG);
      }
    });
  }, [sublink]);

  useEffect(() => {
    if (response) {
      setDataList(ResponseMapper(response));
    }
  }, [response]);

  useEffect(() => {
    if (selectedId) {
      APIService.get(
        APIRoutes.getResponseAdvertisement(selectedId, keyApi),
      ).then(result => {
        if (result) {
          setAdvertisement(result.data as ModelAdvertisement);
        }
      });
    }
  }, [selectedId]);

  useEffect(() => {
    if (advertisement) {
      setCity(advertisement['locationCityName' as keyof ModelAdvertisement]);
      setRegion(
        getRegionContent(
          advertisement.stateData['regionName' as keyof ModelAdvertisement],
        ),
      );
      setYear(advertisement.autoData['year' as keyof ModelAdvertisement]);
      setRace(advertisement.autoData['race' as keyof ModelAdvertisement]);
    }
  }, [advertisement]);

  const Item = ({item, onPress}: any) => (
    <TouchableOpacity onPress={onPress}>
      <View style={AVGPriceStyle.itemResult}>
        <Text style={[AVGPriceStyle.textContainerResult, {color: '#597D35'}]}>
          Id:
        </Text>
        <Text style={AVGPriceStyle.textContainerResult}>
          {item?.classified},
        </Text>
        <Text style={[AVGPriceStyle.textContainerResult, {color: '#597D35'}]}>
          Price:
        </Text>
        <Text style={AVGPriceStyle.textContainerResult}>{item?.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const getRegionContent = (region: string) => {
    let countCharacters = 30 - city.length;
    let newString = '';
    if (region.length + city.length > 30) {
      for (let index = 0; index < countCharacters - 7; index++) {
        region[index] ? (newString += region[index]) : null;
      }
      region = newString + '...';
    }

    return region;
  };

  return (
    <View style={AVGPriceStyle.container}>
      <View style={AVGPriceStyle.header}>
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
        <View style={AVGPriceStyle.headerAdvert}>
          <View style={[AVGPriceStyle.header]}>
            <Text style={[AVGPriceStyle.textAdvert, {fontWeight: 'bold'}]}>
              City:
            </Text>
            <Text style={AVGPriceStyle.textAdvert}>{city + ','}</Text>
            <Text style={AVGPriceStyle.textAdvert}>{region} обл. </Text>
          </View>
          <View style={[AVGPriceStyle.header]}>
            <Text
              style={[
                AVGPriceStyle.textAdvert,
                {marginLeft: 5, fontWeight: 'bold'},
              ]}>
              Year:
            </Text>
            <Text style={AVGPriceStyle.textAdvert}>{year}</Text>
            <Text
              style={[
                AVGPriceStyle.textAdvert,
                {marginLeft: 10, fontWeight: 'bold'},
              ]}>
              Race:
            </Text>
            <Text style={AVGPriceStyle.textAdvert}>{race}</Text>
          </View>
        </View>
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
