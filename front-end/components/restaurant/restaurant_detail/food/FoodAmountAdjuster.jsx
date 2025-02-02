import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../../../constants/Colors';

const FoodAmountAdjuster = ({ amount, onAmountChange }) => {
  return (
    <View style={styles.adjusterContainer}>
      <TouchableOpacity
        style={[styles.adjuster, { marginRight: 25 }]} // Spacing on the right side
        onPress={() => onAmountChange(amount - 1)}
        disabled={amount <= 1}
      >
        <Text style={styles.adjusterButton}>-</Text>
      </TouchableOpacity>

      <Text style={styles.amountText}>{amount}</Text>

      <TouchableOpacity
        style={[styles.adjuster, { marginLeft: 25 }]} // Spacing on the left side
        onPress={() => onAmountChange(amount + 1)}
      >
        <Text style={styles.adjusterButton}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  adjusterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
  },
  adjuster: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  adjusterButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
    textAlign: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
});

export default FoodAmountAdjuster;
