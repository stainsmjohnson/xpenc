import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import LineChartExample from './MyPieChart';

const ExpenseChart = ({style = {}}) => {
  return (
    <Card style={[{paddingHorizontal: 13, paddingVertical: 8}, style]}>
      <Text>Expense Chart</Text>
      <LineChartExample />
    </Card>
  );
};

export default ExpenseChart;

const styles = StyleSheet.create({});
