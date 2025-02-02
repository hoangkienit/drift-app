import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ToppingModal from './ToppingModal';
import FoodAmountAdjuster from './FoodAmountAdjuster';
import { Colors } from '../../../../constants/Colors';

const FoodCard = ({ food, t }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);  // Default food amount
  const [selectedToppings, setSelectedToppings] = useState([]);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleToppingSelection = (topping) => {
    setSelectedToppings((prev) => {
      if (prev.includes(topping)) {
        return prev.filter((item) => item !== topping);
      }
      return [...prev, topping];
    });
  };

  const handleAmountChange = (newAmount) => setAmount(newAmount);

  const handleAddToCart = (note) => {
    console.log(`Food: ${food.name}, Amount: ${amount}, Toppings: ${selectedToppings.join(', ')}, Note: ${note}`);
    // Add the food to the cart
    toggleModal();
  };

  return (
    <View style={styles.card}>
      {/* Food Image */}
      <Image source={{ uri: food.imageUrl }} style={styles.foodImage} />

      {/* Card Content */}
      <View style={styles.cardContent}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodPrice}>${food.price}</Text>
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Topping Modal */}
      <ToppingModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        toppings={food.toppings}
        selectedToppings={selectedToppings}
        onToppingSelection={handleToppingSelection}
        onAddToCart={handleAddToCart}
        t={t}
      >
        {/* Food Amount Adjuster inside the Modal */}
        <FoodAmountAdjuster amount={amount} onAmountChange={handleAmountChange} />
      </ToppingModal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: 120, // Adjust card height
    alignItems: 'center',  // Align image to center vertically
  },
  foodImage: {
    width: 100, // Image width
    height: 100, // Image height
    borderRadius: 10,
    marginLeft: 10, // Space the image from the left edge
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  foodName: {
    fontSize: 17,
    fontFamily: 'montserrat-bold'
  },
  foodPrice: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'montserrat-bold'
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodCard;
