import React, {useContext, useEffect, useState} from 'react';
import {Button, Image, Linking, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import KeyProviderContext from '../KeyProvider/KeyProviderContext';
import EnterKeyStyles from './EnterKeyStyles';

const EnterKeyPage = ({navigation}: any) => {
  const {keyApi, setKeyApi} = useContext(KeyProviderContext);
  const [text, setText] = useState('');
  const [colorButtonOk, setColorButtonOk] = useState('#f3b2cc');
  const url = 'https://api.ria.com/account/api';

  const openUrl = () => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  useEffect(() => {
    text.length == 40
      ? setColorButtonOk('#D80056')
      : setColorButtonOk('#f3b2cc');
  }, [text]);

  return (
    <View>
      <View style={EnterKeyStyles.container}>
        <Text style={EnterKeyStyles.text}>WELCOME</Text>
        <Text style={EnterKeyStyles.text}>TO</Text>
        <Image
          source={require('../../images/logo_ria.png')}
          resizeMode="contain"
          style={EnterKeyStyles.image}
        />
      </View>

      <View style={{paddingVertical: 50}}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TextInput
            style={EnterKeyStyles.textInput}
            placeholder="Enter please your Api key ..."
            maxLength={40}
            onChangeText={newText => {
              setText(newText);
            }}
            defaultValue={text}
          />
          <TouchableOpacity
            style={[EnterKeyStyles.buttonOk, {backgroundColor: colorButtonOk}]}
            onPress={() => setKeyApi(text)}>
            <Text style={[EnterKeyStyles.buttonText]}>Ok</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[EnterKeyStyles.buttonGetKey]}
          onPress={() => openUrl()}>
          <Text style={EnterKeyStyles.buttonText}>Get Api key</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterKeyPage;
