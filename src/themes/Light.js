import {DefaultTheme} from '@react-navigation/native';
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

export const LightTheme = {
  ...DefaultTheme,
  ...PaperDefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
