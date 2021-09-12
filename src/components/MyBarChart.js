import React from 'react';
import {View} from 'react-native';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import * as scale from 'd3-scale';

class HorizontaBarChartWithYAxis extends React.PureComponent {
  render() {
    const data = [
      {
        value: 20,
        label: 'One',
        svg: {fill: '#999'},
      },
      {
        value: 3.9,
        label: 'Two',
        svg: {fill: 'red'},
      },
    ];
    const CUT_OFF = 30;
    const Labels = ({x, y, bandwidth, data}) =>
      data.map((value, index) => {
        return (
          <Text
            key={index}
            x={
              x(value.value) < CUT_OFF * 2
                ? x(value.value) + 10
                : x(value.value) - 30
            }
            y={y(index) + bandwidth / 2}
            fontSize={14}
            fill={value.value > CUT_OFF ? 'green' : 'green'}
            alignmentBaseline={'middle'}>
            {value.value}
          </Text>
        );
      });

    return (
      <View style={{flexDirection: 'row', height: 120, paddingVertical: 16}}>
        <BarChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          horizontal={true}
          yAccessor={({item}) => item.value}
          // svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          {/* <Grid direction={Grid.Direction.VERTICAL} /> */}
          <Labels />
        </BarChart>
        <YAxis
          data={data}
          yAccessor={({index}) => index}
          scale={scale.scaleBand}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          svg={{
            fill: 'black',
          }}
          formatLabel={(_, index) => data[index].label}
        />
      </View>
    );
  }
}

export default HorizontaBarChartWithYAxis;
