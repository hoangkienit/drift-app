import { View, ScrollView, Animated } from "react-native";
import { useRef } from "react";
import RestaurantHeader from "../components/restaurant/restaurant_detail/RestaurantHeader";
import FloatingBackButton from "../components/restaurant/restaurant_detail/FloatingBackButton";
import RestaurantHeaderImage from "../components/restaurant/restaurant_detail/RestaurantHeaderImage";
import RestaurantInfo from "../components/restaurant/restaurant_detail/RestaurantInfo";
import FoodCard from '../components/restaurant/restaurant_detail/food/FoodCard';
import { restaurantData } from "../constants/data";  // Ensure this imports the updated restaurant data

const RestaurantDetailScreen = ({ props, t }) => {
  const { id, name, rating, minutes, avatar } = props;
  
  // Initialize scrollY as an Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // Find the restaurant data based on the restaurant id
  const restaurant = restaurantData.find((restaurant) => restaurant.id === id);

  // Access the specific food items for the restaurant
  const foodItemsForRestaurant = restaurant ? restaurant.foodItems : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <RestaurantHeader scrollY={scrollY} t={t} />
      <FloatingBackButton scrollY={scrollY} />
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <RestaurantHeaderImage avatar={avatar} />
        <RestaurantInfo name={name} rating={rating} minutes={minutes} t={t} />

        {foodItemsForRestaurant.map((food) => (
          <FoodCard key={food.id} food={food} t={t} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;
