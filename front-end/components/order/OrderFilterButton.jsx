import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const OrderFilterButton = ({ openModal, statusFilter }) => {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={openModal}>
      <Ionicons name="filter" size={20} color="#000" style={styles.filterIcon} />
      <Text style={styles.filterButtonText}>{statusFilter}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
        borderRadius: 5,
    marginRight: 15
  },
  filterButtonText: {
    fontSize: 16,
      marginLeft: 5,
    fontFamily: 'montserrat-medium'
  },
  filterIcon: {
    marginRight: 5,
  },
});

export default OrderFilterButton;
