import React, {useContext} from 'react';
import KeyProviderContext from '../KeyProvider/KeyProviderContext';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EnterKeyPage from '../enter-api-key/EnterKeyPage';
import AppTabs from './AppTabs/AppTabs';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EnterKeyPage"
          component={EnterKeyPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
