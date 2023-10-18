import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const WeightChart = ({ data }) => {
  return (
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: data,
          },
        ],
      }}
      width={300} // from react-native
      height={220}
      yAxisLabel="kg"
      yAxisSuffix="kg"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default WeightChart;
