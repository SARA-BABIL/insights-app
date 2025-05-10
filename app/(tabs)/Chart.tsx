/*import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Chart = () => {
  const data = [
    {
      name: 'Pizza',
      revenue: 215000,
      color: '#f00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Burger',
      revenue: 280000,
      color: '#0f0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Sushi',
      revenue: 527612,
      color: '#00f',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>Revenu par plat</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        accessor="revenue"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default Chart;

*/