import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";

const RestaurantCard = ({ id, avatar, name, rating, distance, minutes, t, isOpen }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: `/restaurant/${id}`, // Navigates to /restaurant/1
          params: { name, avatar, rating, distance, minutes }, // Passes props
        })
      }
    >
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.infoContainer}>
        {/* Open/Closed Box */}
        <View style={[styles.openStatus, { backgroundColor: isOpen ? Colors.primary : "#e6e8e8" }]}>
          <Text style={styles.openStatusText}>{isOpen ? t("restaurant.card.open") : t("restaurant.card.closed")}</Text>
        </View>

        {/* Restaurant Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Rating */}
        <View style={styles.row}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{rating}</Text>
        </View>

        {/* Distance and Minutes */}
        <View style={styles.row}>
          <View style={styles.infoColumn}>
            <Icon name="location-sharp" size={16} color="gray" />
            <Text style={styles.detail}>{distance} km</Text>
          </View>
          <View style={styles.infoColumn}>
            <Icon name="time-sharp" size={16} color="gray" />
            <Text style={styles.detail}>{minutes} {t("restaurant.card.minutes")}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 3,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  openStatus: {
    width: "33%",
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  openStatusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "montserrat-medium",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
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
    fontFamily: "montserrat-medium",
  },
  detail: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
    fontFamily: "montserrat-medium",
  },
  infoColumn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15, // Space between columns
  },
});

export default RestaurantCard;
