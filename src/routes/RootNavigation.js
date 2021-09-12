import * as React from 'react';
import {Appearance} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
//main navigator
import DrawerNavigationHandler from './DrawerNavigation';
//theme
import {LightTheme, Dark as DarkTheme} from '../themes';

function RootNavigation() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const colorSchemeDark = Appearance.getColorScheme() === 'dark';
    setIsDarkMode(colorSchemeDark);
    Appearance.addChangeListener(themeChangeListener);
    return () => Appearance.removeChangeListener(themeChangeListener);
  }, []);

  const themeChangeListener = preference => {
    console.log('##USER PREFERED THEME CHANGED', preference);
    const colorSchemeDark = preference.colorScheme === 'dark';
    setIsDarkMode(colorSchemeDark);
  };

  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
        <DrawerNavigationHandler />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default RootNavigation;
