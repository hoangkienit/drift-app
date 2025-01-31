import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RestaurantCard from "../components/RestaurantCard";

const restaurantData = [
  {
    id: "1",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "2",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "3",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "4",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "5",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
];

export default function RestaurantList() {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Just to visualize the area
  },
});
