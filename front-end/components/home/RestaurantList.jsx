import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import RestaurantCard from "../home/RestaurantCard";
import { restaurantData } from "../../constants/data";

export default function RestaurantList({t, restaurants}) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RestaurantCard data={item} t={t} isOpen={true} />}
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
