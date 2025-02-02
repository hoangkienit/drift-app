import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RestaurantCard from "../RestaurantCard";
import { restaurantData } from "../../constants/data";

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
