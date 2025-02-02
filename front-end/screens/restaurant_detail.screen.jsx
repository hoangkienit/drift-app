import { View, ScrollView, Animated } from "react-native";
import { useRef } from "react";
import RestaurantHeader from "../components/restaurant/restaurant_detail/RestaurantHEader";
import FloatingBackButton from "../components/restaurant/restaurant_detail/FloatingBackButton";
import RestaurantHeaderImage from "../components/restaurant/restaurant_detail/RestaurantHeaderImage";
import RestaurantInfo from "../components/restaurant/restaurant_detail/RestaurantInfo";
import FoodCard from '../components/restaurant/restaurant_detail/food/FoodCard';
import { foodItems } from "../constants/data";

const RestaurantDetailScreen = ({ props, t }) => {
  const { id, name, rating, minutes, avatar } = props;
  const scrollY = useRef(new Animated.Value(0)).current;

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

        {foodItems.map((food) => (
          <FoodCard key={food.id} food={food} t={t} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;
