import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import LineChartExample from './MyLineChart';

const ExpenseChart = ({style = {}, data = []}) => {
  return (
    <Card style={[{paddingHorizontal: 13, paddingVertical: 8}, style]}>
      <Text>Expense Chart</Text>
      <LineChartExample data={data} />
    </Card>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({});
