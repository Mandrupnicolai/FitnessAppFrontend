import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeightChart = () => {
  // Mock data - In real app, this would come from a backend
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [75, 74, 73, 72, 71, 70],
        color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`, // Blue color
        strokeWidth: 2,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix="kg"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(52, 152, 219, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#3498db',
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#e0e0e0',
              strokeDasharray: '0',
            },
          }}
          bezier
          style={styles.chart}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={false}
          onDataPointClick={({ value }) => {
            // Handle data point click - could show a tooltip or modal
            console.log('Clicked on:', value);
          }}
          renderDotContent={({ x, y, index }) => (
            <View
              key={index}
              style={[
                styles.tooltip,
                {
                  top: y - 30,
                  left: x - 20,
                },
              ]}
            >
              <Text style={styles.tooltipText}>{data.datasets[0].data[index]}kg</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginVertical: 10,
  },
  chartContainer: {
    marginHorizontal: -10, // Compensate for parent padding
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    padding: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default WeightChart;
