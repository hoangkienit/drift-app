import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ToppingModal from './ToppingModal';
import FoodAmountAdjuster from './FoodAmountAdjuster';
import { Colors } from '../../../../constants/Colors';

const FoodCard = ({ food, t, restaurant, useCartStore }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const { addToCart } = useCartStore;

  // Animation values
  const scaleValue = useState(new Animated.Value(1))[0];

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
    const foodItem = {
      id: Math.random().toString(),
      name: food.name,
      img: food.imageUrl,
      price: food.price,
      quantity: amount,
      toppings: selectedToppings,
      note: note,
      restaurantId: restaurant.id,
    };

    // Add the food to the cart
    addToCart(foodItem);

    // Trigger the animation
    animateAddToCart();

    // Close the modal
    toggleModal();
  };

  const animateAddToCart = () => {
    // Scale the food card to make it appear like it's adding to the cart
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
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
    </Animated.View>
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
    alignItems: 'center', // Align image to center vertically
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
    fontFamily: 'montserrat-bold',
  },
  foodPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: 'montserrat-bold',
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
