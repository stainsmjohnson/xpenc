import React from 'react';
import {LineChart, AreaChart, Path, Grid} from 'react-native-svg-charts';

class LineChartExample extends React.PureComponent {
  render() {
    // const data1 = this.props.data.map(item => item.amount);
    const data1 = this.props.data.map(item => ({
      value: item.amount,
      label: item.time,
    }));
    const data2 = [
      -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18,
    ];

    //Array of datasets, following this syntax:
    const data3 = [
      {
        data: data1,
        svg: {stroke: 'purple'},
      },
      // {
      //   data: data2,
      //   svg: {stroke: 'green'},
      // },
    ];

    return (
      <AreaChart
        style={{height: 200}}
        data={this.props.data}
        xAccessor={({item}) => item.time}
        yAccessor={({item}) => item.amount}
        svg={{
          fill: 'red',
        }}
        contentInset={{top: 20, bottom: 20}}>
        {/* <Grid /> */}
      </AreaChart>
    );
  }
}

export default LineChartExample;
