import {AppRegistry} from 'react-native';
import RootNavigation from './src/routes/RootNavigation';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigation);
