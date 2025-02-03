import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import { getLocation } from "../utils/location";
import HomeHeader from "../components/home/HomeHeader";
import HomeContent from "../components/home/HomeContent";
import {useCartStore} from "../stores/useCartStore"

export default function HomeScreen() {
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const useCartStoreZustand = useCartStore();
  
  const cartItems = [
  {
    id: 1,
    name: "Cheese Burger",
    image: "https://example.com/cheeseburger.jpg",
    restaurant: "Burger King",
  },
  {
    id: 2,
    name: "French Fries",
    image: "https://example.com/fries.jpg",
    restaurant: "Burger King",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    image: "https://example.com/pizza.jpg",
    restaurant: "Pizza Hut",
  },
];


  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <HomeHeader location={location} useCartStore={useCartStoreZustand} t={t} />
        <HomeContent t={t} />
      </View>
    </TouchableWithoutFeedback>
  );
}
