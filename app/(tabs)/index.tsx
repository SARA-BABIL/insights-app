import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DishStatistics from './DishStatistics'; // adapte le chemin selon ton dossier

// Puis dans le JSX de ta Home Page :




export default function HomeScreen() {
  const data = {
    All: {
      reservations: 23,
      revenue: 2400.5,
      rating: 4.5,
      cancellations: '0%',
      dishes: 4,
      dishDetails: [
        { name: 'Couscous, 7 vegetables', price: 560, color: '#3e7d34' },
        { name: 'Tagine, meat with plum', price: 345, color: '#5ba749' },
        { name: 'Tangia', price: 240.5, color: '#b0e57c' },
        { name: 'Harira', price: 120, color: '#87c679' },
        { name: 'Briouat', price: 180, color: '#68a655' },
        { name: 'Pastilla', price: 300, color: '#d1e05b' },
      ],
    },
    Week: {
      reservations: 7,
      revenue: 750,
      rating: 4.7,
      cancellations: '0%',
      dishes: 4,
      dishDetails: [
        { name: 'Couscous, 7 vegetables', price: 560, color: '#3e7d34' },
        { name: 'Tagine, meat with plum', price: 345, color: '#5ba749' },
        { name: 'Harira', price: 120, color: '#87c679' },
      ],
    },
    Month: {
      reservations: 15,
      revenue: 1450,
      rating: 4.5,
      cancellations: '0%',
      dishes: 4,
      dishDetails: [
        { name: 'Couscous, 7 vegetables', price: 560, color: '#3e7d34' },
        { name: 'Tagine, meat with plum', price: 345, color: '#5ba749' },
        { name: 'Tangia', price: 240.5, color: '#b0e57c' },
        { name: 'Harira', price: 120, color: '#87c679' },
        //{ name: 'Pastilla', price: 300, color: '#d1e05b' },
      ],
    },
    Year: {
      reservations: 20,
      revenue: 2000,
      rating: 4.6,
      cancellations: '0%',
      dishes: 4,
      dishDetails: [
        { name: 'Couscous, 7 vegetables', price: 560, color: '#3e7d34' },
        { name: 'Tagine, meat with plum', price: 345, color: '#5ba749' },
        { name: 'Tangia', price: 240.5, color: '#b0e57c' },
        { name: 'Harira', price: 120, color: '#87c679' },
        //{ name: 'Pastilla', price: 300, color: '#d1e05b' },
        { name: 'Briouat', price: 180, color: '#68a655' },
      ],
    },
  };

  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <ScrollView style={styles.container}>
      {/* Barre supérieure style iPhone */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.icons}>
          <Ionicons name="wifi-outline" size={20} color="black" />
          <Ionicons name="battery-full-outline" size={20} color="black" style={{ marginLeft: 8 }} />
        </View>
      </View>

      <Text style={styles.title}>Insights</Text>

      {/* Filtres de période */}
      <View style={styles.filters}>
        <View style={styles.filterCard}>
          {['All', 'Week', 'Month', 'Year'].map((period, idx) => (
            <React.Fragment key={period}>
              <TouchableOpacity
                onPress={() => setSelectedFilter(period)}
                style={[styles.filterButton, selectedFilter === period && styles.filterButtonActive]}
              >
                <Text style={[styles.filterText, selectedFilter === period && styles.filterTextActive]}>
                  {period}
                </Text>
              </TouchableOpacity>
              
              {idx < 3 && <Text style={styles.separator}>|</Text>}
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Reservations</Text>
            <Text style={styles.statsLabel}>Total Revenue</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsValue}>{data[selectedFilter].reservations}</Text>
            <View style={styles.statsValueContainer}>
              <Text style={styles.statsValue}>${data[selectedFilter].revenue}</Text>
              <Ionicons name="arrow-down-outline" size={16} color="red" style={styles.icon} />
            </View>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Rating</Text>
            <Text style={styles.statsLabel}>Cancellations</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statsValueContainer}>
              <Text style={styles.statsValue}>{data[selectedFilter].rating}</Text>
              <Ionicons name="arrow-up-outline" size={16} color="green" style={styles.icon} />
            </View>
            <View style={styles.statsValueContainer}>
              <Text style={styles.statsValue}>{data[selectedFilter].cancellations}</Text>
              <Ionicons name="arrow-down-outline" size={16} color="red" style={styles.icon} />
            </View>
          </View>
        </View>
      </View>

      {/* PieChart */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Revenue</Text>
          <PieChart
            data={data[selectedFilter].dishDetails.map(dish => ({
              name: dish.name,
              population: dish.price,
              color: dish.color,
              legendFontColor: '#000',
              legendFontSize: 15,
            }))}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: () => `rgba(0,0,0,1)`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            hasLegend={false}
          />

          <View style={{ marginBottom: 40, alignItems: 'center' }}>
            <Text style={styles.statsLabel}>Total Revenue</Text>
            <Text style={styles.statsValue}>${data[selectedFilter].revenue}</Text>
            <Text style={styles.statsLabel}>{data[selectedFilter].dishes} Dishes</Text>
          </View>

          {/* Détails des plats */}
          <View style={styles.dishList}>
            {data[selectedFilter].dishDetails.map((dish, index) => (
              <View style={styles.dishRow} key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.circle, { backgroundColor: dish.color }]} />
                  <Text style={styles.dish}>{dish.name}</Text>
                </View>
                <Text style={styles.dishPrice}>${dish.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <DishStatistics />

      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Ionicons name="calendar-clear-outline" size={25} color="grey" />
          <Text style={styles.navText}>Calendar</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="fast-food-outline" size={25} color="grey" />
          <Text style={styles.navText}>My Dishes</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="chatbox-outline" size={25} color="grey" />
          <Text style={styles.navText}>Inbox</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="pie-chart-outline" size={25} color="green" />
          <Text style={{color: 'green'}}>Insights</Text>
        </View>
        <View style={styles.navItem}>
          <Ionicons name="person-circle-outline" size={25} color="grey" />
          <Text style={styles.navText}>Profile</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: '#fff',
    
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  
  
 
  filters: {
    marginVertical: 10,
    alignItems: 'center',
  },
  filterCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: '100%',
  },
  filterButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',   
    alignItems: 'center',       
  },
  filterButtonActive: {
    backgroundColor: 'green',
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    marginHorizontal: 6,
    color: '#000',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },

  

  statsContent: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',  
  },
  statsCard: {
    backgroundColor: '#ECF3ED',
    padding: 15,
    borderRadius: 10,
    width: '100%',  
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#88888C',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  statsLabel: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  statsValue: {
    fontWeight: '400',
    color: 'green',
    textAlign: 'right',
    fontSize: 14,
  },
  statsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  icon: {
    marginLeft: 5, 
  },
  dishList: {
    marginTop: 10,
  },
  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
  },
  dish: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right', 
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },


  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 4,
  },
  
  
  chartContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  
  
}); 