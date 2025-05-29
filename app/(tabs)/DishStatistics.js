import { Picker } from '@react-native-picker/picker'; // installe ce package : npm install @react-native-picker/picker
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const allDishStats = {
  Harira: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    reservations: [30, 45, 28, 50, 35, 40, 45, 50, 55, 60, 65, 70],
    cancellations: [5, 10, 7, 3, 4, 2, 5, 6, 8, 3, 4, 2],
  },
  Couscous: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    reservations: [40, 35, 50, 60, 55, 60, 65, 70, 75, 80, 85, 90],
    cancellations: [2, 5, 4, 1, 3, 2, 4, 5, 6, 2, 3, 4],
  },
  "Tagine meat with plum": {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    reservations: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
    cancellations: [3, 6, 2, 4, 5, 3, 4, 2, 6, 7, 8, 5],
  },
  Tangia: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    reservations: [15, 20, 18, 25, 22, 24, 28, 30, 32, 35, 38, 40],
    cancellations: [1, 3, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1],
  },
  Briouat: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    reservations: [10, 12, 15, 18, 20, 22, 25, 27, 30, 33, 35, 37],
    cancellations: [0, 1, 1, 0, 1, 0, 1, 2, 1, 1, 2, 1],
  },
};

const DishStatistics = () => {
  const [selectedDish, setSelectedDish] = useState('Harira');
  const [selectedStatType, setSelectedStatType] = useState('reservations');

  const dishData = allDishStats[selectedDish];
  const dishes = Object.keys(allDishStats);
  const chartWidth = (screenWidth - 32) * 0.9; 

  return (
    <View style={styles.container}>
      {/* Header avec titre à gauche et picker à droite */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Dish Statistics</Text>
       <View style={styles.pickerContainer}>
 <Picker
  selectedValue={selectedDish}
  onValueChange={setSelectedDish}
  style={[
    styles.picker,
     { color: selectedDish ? 'green' : '#444' },
  ]}
  mode="dropdown"
>
  {dishes.map(dish => (
    <Picker.Item
      key={dish}
      label={dish}
      value={dish}
    />
  ))}
</Picker>

</View>

      </View>

      {/* Boutons radio pour reservations / cancellations */}
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedStatType('reservations')}
        >
          <View
            style={[
              styles.radioCircle,
              selectedStatType === 'reservations' && styles.radioSelectedGreen,
            ]}
          />
          <Text style={styles.radioLabel}>Reservations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedStatType('cancellations')}
        >
          <View
            style={[
              styles.radioCircle,
              selectedStatType === 'cancellations' && styles.radioSelectedOrange,
            ]}
          />
          <Text style={styles.radioLabel}>Cancellations</Text>
        </TouchableOpacity>
      </View>

      {/* Graphique à barres */}
      <BarChart
        data={{
          labels: dishData.labels,
          datasets: [
            {
              data: dishData[selectedStatType],
              color: () =>
                selectedStatType === 'reservations' ? 'green' : 'orange',
            },
          ],
          legend: [
            selectedStatType.charAt(0).toUpperCase() + selectedStatType.slice(1),
          ],
        }}
        width={chartWidth}
        height={280}
        fromZero
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => '#000',
          labelColor: () => '#444',
          barPercentage: 0.5,
          propsForBackgroundLines: {
            stroke: 'transparent',
          },
        }}
        verticalLabelRotation={0}
        showBarTops={false}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    marginHorizontal: 16,      // idem autres cartes
    marginVertical: 8, 
    marginLeft: 0,        // pour espacer verticalement si besoin
    padding: 16,
    backgroundColor: '#ECF3ED',
    borderRadius: 16,
    borderWidth: 1,            // ajout de la bordure
    borderColor: '#000',       // couleur bordure identique aux autres
    elevation: 4,
    // width à 100% pour s'adapter à son parent
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
pickerContainer: {
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 20,
  overflow: 'hidden',
  width: 180,
  height: 40,
  justifyContent: 'center',  // centre le contenu verticalement
  backgroundColor: 'transparent', // enlève fond container
},
picker: {
  height: 40,
  width: '100%',
  color: '#444',
  backgroundColor: '#F9F9F9', // enlève fond picker
  paddingHorizontal: 8,
},


  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 6,
  },
  radioSelectedGreen: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  radioSelectedOrange: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  radioLabel: {
    fontSize: 16,
  },
  chart: {
    borderRadius: 16,
    marginLeft: 40
  },
});

export default DishStatistics;
