import {DarkTheme} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme} from 'react-native-paper';

export const Dark = {
  ...DarkTheme,
  ...PaperDarkTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...DarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};
