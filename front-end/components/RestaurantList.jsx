import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RestaurantCard from "../components/RestaurantCard";

const restaurantData = [
  {
    id: "1",
    avatar: "https://picsum.photos/id/237/200/300",
    name: "Sushi Place",
    rating: 4.0,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "2",
    avatar: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
    name: "KFC",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "3",
    avatar: "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY",
    name: "Lotteria",
    rating: 5.0,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "4",
    avatar: "https://fastly.picsum.photos/id/42/3456/2304.jpg?hmac=dhQvd1Qp19zg26MEwYMnfz34eLnGv8meGk_lFNAJR3g",
    name: "Popeyes",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
  {
    id: "5",
    avatar: "https://fastly.picsum.photos/id/50/4608/3072.jpg?hmac=E6WgCk6MBOyuRjW4bypT6y-tFXyWQfC_LjIBYPUspxE",
    name: "Texas",
    rating: 4.5,
    distance: 1.2,
    minutes: 15,
  },
];

export default function RestaurantList({t}) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard {...item} t={t} isOpen={true} />}
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
