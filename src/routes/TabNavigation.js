import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import DashboardDaily from '../screens/main/DashboardDaily';
import DashboardWeekly from '../screens/main/DashboardWeekly';
import DashboardMonthly from '../screens/main/DashboardMonthly';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DashboardDaily"
        component={DashboardDaily}
        options={{title: 'Daily'}}
      />
      <Tab.Screen
        name="DashboardWeekly"
        component={DashboardWeekly}
        options={{title: 'Weekly'}}
      />
      <Tab.Screen
        name="DashboardMonthly"
        component={DashboardMonthly}
        options={{title: 'Monthly'}}
      />
    </Tab.Navigator>
  );
}
