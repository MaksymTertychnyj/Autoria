import axios from 'axios';
import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import APIRoutes from '../../../../android/api-service/APIRoutes';
import APIService from '../../../../android/api-service/APIService';
import KeyProviderContext from '../../KeyProvider/KeyProviderContext';
import SelectTypeTransport from '../../select-transport/SelectTypeTransport';
import AppTabsStyle from './AppTabsStyle';

const AppTabs = () => {
  const {keyApi} = useContext(KeyProviderContext);

  return (
    <View>
      <View style={AppTabsStyle.header}>
        <Image
          source={require('../../../images/logo_ria.png')}
          style={AppTabsStyle.header}
        />
        <TouchableOpacity
          style={[AppTabsStyle.buttonChangeKey]}
          onPress={() => {}}>
          <Text style={AppTabsStyle.buttonText}>Get Api key</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingTop: 60}}>
        <SelectTypeTransport />
      </View>
    </View>
  );
};

export default AppTabs;
