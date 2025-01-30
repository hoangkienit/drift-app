import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RestaurantCard = ({ avatar, name, rating, distance, minutes }) => {
  return (
    <View style={styles.card}>
      {/* Restaurant Avatar */}
      <Image source={{ uri: avatar }} style={styles.avatar} />

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>

        {/* Rating */}
        <View style={styles.row}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
        </View>

        {/* Distance & Time */}
        <View style={styles.row}>
          <Icon name="location-outline" size={16} color="gray" />
          <Text style={styles.detail}>{distance} km</Text>

          <Icon name="time-outline" size={16} color="gray" style={styles.timeIcon} />
          <Text style={styles.detail}>{minutes} min</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  detail: {
    fontSize: 13,
    color: "gray",
    marginLeft: 5,
  },
  timeIcon: {
    marginLeft: 10,
  },
});

export default RestaurantCard;
