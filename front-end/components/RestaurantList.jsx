import React from "react";
import { View, FlatList } from "react-native";
import RestaurantCard from "../components/RestaurantCard";

const restaurantData = [
  {
    id: "1",
    avatar: "https://source.unsplash.com/100x100/?restaurant",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "2",
    avatar: "https://source.unsplash.com/100x100/?pizza",
    name: "Pizza Corner",
    rating: 4.7,
    distance: 2.5,
    minutes: 20,
  },
  {
    id: "3",
    avatar: "https://source.unsplash.com/100x100/?burger",
    name: "Burger Town",
    rating: 4.3,
    distance: 0.8,
    minutes: 10,
    },
  {
    id: "4",
    avatar: "https://source.unsplash.com/100x100/?burger",
    name: "Burger Town",
    rating: 4.3,
    distance: 0.8,
    minutes: 10,
    },
  {
    id: "5",
    avatar: "https://source.unsplash.com/100x100/?burger",
    name: "Burger Town",
    rating: 4.3,
    distance: 0.8,
    minutes: 10,
    },
  {
    id: "6",
    avatar: "https://source.unsplash.com/100x100/?burger",
    name: "Burger Town",
    rating: 4.3,
    distance: 0.8,
    minutes: 10,
  },
];

export default function RestaurantList() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard {...item} />}
      />
    </View>
  );
}
