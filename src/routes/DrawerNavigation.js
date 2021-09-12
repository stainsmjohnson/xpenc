import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
//screens
import TabNavigator from './TabNavigation';
import Options from '../screens/main/Options';
import Export from '../screens/main/Export';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home1">
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="Options" component={Options} />
      <Drawer.Screen name="Export" component={Export} />
    </Drawer.Navigator>
  );
}
