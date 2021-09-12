import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, ProgressBar} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');
//db
import Database from '../../db/db';
import moment from 'moment';

const Export = () => {
  const [prog, setProgress] = React.useState(0);
  const [progressStarted, setProgressStarted] = React.useState(false);
  const [progressVisible, setProgressVisible] = React.useState(false);
  const [progressMessage, setProgressMessage] = React.useState('');
  const checkDB = async () => {
    // const realm = await Database.getRealm();
    // const transactions = realm.objects('Transaction');
    // console.log(transactions);
  };

  useEffect(() => {
    checkDB();
  }, []);

  const getProgress = (current, total) => current / total;

  const readFile = async (path, size, onProgress = () => {}) => {
    let chunk = '';
    let total = '';
    let lastLog = moment();
    do {
      chunk = await RNFS.read(path, 30000, total.length, 'utf8');
      total += chunk;
      const diff = moment().diff(lastLog, 'second');
      if (diff > 1) {
        lastLog = moment();
        const progress = getProgress(total.length, size);
        onProgress(progress);
      } else if (total.length === size) {
        onProgress(1);
      }
    } while (chunk.length > 0);
    return total;
  };

  const writeFile = async (data, onProgress = () => {}) => {
    const dataToWrite = JSON.stringify(data);
    const size = dataToWrite.length;
    const path = RNFS.DocumentDirectoryPath + '/xpenc.json';

    let chunk = '';
    let total = dataToWrite;
    let lastLog = moment();
    let iteration = 0;
    console.log('EXPORTING');
    while (total.length > 0) {
      const chunk = total.slice(0, 30000);
      console.log(chunk.length);
      let success = await RNFS.write(path, chunk, iteration, 'utf8');
      iteration = -1;
      console.log('##SAVED ', success, total.length);
      total = total.slice(30000);
      const diff = moment().diff(lastLog, 'second');
      if (diff > 1) {
        lastLog = moment();
        const progress = getProgress(total.length, size);
        onProgress(progress);
      } else if (total.length === 0) {
        onProgress(1);
      }
    }
    return total;
  };

  const _onImport = async () => {
    // Pick a single file
    try {
      setProgressVisible(true);
      const res = await DocumentPicker.pick({
        type: ['application/json'],
      });
      const file = res?.[0];

      setProgressStarted(true);
      setProgressMessage('Reading File...');
      const fileData = await readFile(file.uri, file.size, progress => {
        console.log('## READING FILE ', progress);
        setProgress(progress / 2);
      });

      const dataToImport = JSON.parse(fileData);
      setProgress(0);
      setProgressMessage('Adding transactions...');
      // return;
      Database.createTestData(dataToImport, progress => {
        console.log('## CREATE PROGRESS ', progress);
        setProgress(progress / 2 + 0.5);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const _onExport = async () => {
    const realm = await Database.getRealm();
    const transactions = realm.objects('Transaction');
    console.log(transactions);

    writeFile(transactions);
  };

  return (
    <View>
      <Text>
        {progressMessage} : {prog}
      </Text>
      <ProgressBar
        progress={prog}
        color={'blue'}
        indeterminate={!progressStarted}
        visible={progressVisible}
      />
      <Button onPress={_onImport}>Import</Button>
      <Button onPress={_onExport}>Export</Button>
    </View>
  );
};

export default Export;

const styles = StyleSheet.create({});
