import { View, ScrollView, Animated } from "react-native";
import { useRef } from "react";
import RestaurantHeader from "../components/restaurant/restaurant_detail/RestaurantHeader";
import FloatingBackButton from "../components/restaurant/restaurant_detail/FloatingBackButton";
import RestaurantHeaderImage from "../components/restaurant/restaurant_detail/RestaurantHeaderImage";
import RestaurantInfo from "../components/restaurant/restaurant_detail/RestaurantInfo";
import FoodCard from '../components/restaurant/restaurant_detail/food/FoodCard';
import {useCartStore} from "../stores/useCartStore"
import CartBottomButton from "../components/restaurant/restaurant_detail/CartBottomButton";

const RestaurantDetailScreen = ({ props, t }) => {
  const useCartStoreZustand = useCartStore();
  // Initialize scrollY as an Animated.Value
  const scrollY = useRef(new Animated.Value(0)).current;

  // Find the restaurant data based on the restaurant id
  const restaurant = props;

  // Access the specific food items for the restaurant
  const foodItemsForRestaurant = restaurant ? restaurant.foods : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <RestaurantHeader scrollY={scrollY} t={t} />
      <FloatingBackButton scrollY={scrollY} />
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <RestaurantHeaderImage avatar={props.coverImage} />
        <RestaurantInfo name={props.name} description={props.description} rating={props.rating} minutes={0} t={t} />

        {foodItemsForRestaurant.map((food) => (
          <FoodCard key={food.id} food={food} t={t} restaurant={restaurant} useCartStore={useCartStoreZustand} />
        ))}
      </ScrollView>

      <CartBottomButton t={ t} useCartStore={useCartStoreZustand} />
    </View>
  );
};

export default RestaurantDetailScreen;
