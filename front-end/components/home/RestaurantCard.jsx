import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import webSocketService from "../../services/websocket.service";

const RestaurantCard = ({ data, t}) => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantStatus, setRestaurantStatus] = useState('closed');

  useEffect(() => {
    setRestaurant(data);
  },[]);

  useEffect(() => {
    const handleStatusUpdate = ({ merchantId: updatedId, status }) => {
      if (updatedId === data._id) {
        setRestaurant((prev) => ({ ...prev, status }));
        setRestaurantStatus(status);
      }
    };

    webSocketService.listen("RESTAURANT_STATUS_UPDATED", handleStatusUpdate);
    return () => webSocketService.remove("RESTAURANT_STATUS_UPDATED", handleStatusUpdate);
  }, [data._id]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: `/restaurant/${data._id}`,
          params: { data: JSON.stringify(data) },
        })
      }
    >
      <Image source={{ uri: data.logo }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        {/* Open/Closed Status */}
        <LinearGradient
          colors={restaurant?.status === 'open' ? ["#4CAF50", "#66BB6A"] : ["#B0BEC5", "#CFD8DC"]}
          style={styles.openStatus}
        >
          <Text style={styles.openStatusText}>{restaurant?.status === 'open' ? t("restaurant.card.open") : t("restaurant.card.closed")}</Text>
        </LinearGradient>

        {/* Restaurant Name */}
        <Text style={styles.name}>{data.name}</Text>

        {/* Rating */}
        <View style={styles.row}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>{data.rating > 0 ? data.rating : t('restaurant.card.new_restaurant_status')}</Text>
        </View>

        {/* Distance & Time */}
        <View style={styles.row}>
          <View style={styles.infoColumn}>
            <Icon name="location-sharp" size={16} color="gray" />
            <Text style={styles.detail}>0 km</Text>
          </View>
          <View style={styles.infoColumn}>
            <Icon name="time-sharp" size={16} color="gray" />
            <Text style={styles.detail}>0 {t("restaurant.card.minutes")}</Text>
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
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  openStatus: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  openStatusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
    fontFamily: 'montserrat-bold'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  rating: {
    fontSize: 15,
    color: "#444",
    marginLeft: 5,
    fontFamily: 'montserrat-medium'
  },
  detail: {
    fontSize: 14,
    color: "gray",
    marginLeft: 5,
  },
  infoColumn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
});

export default RestaurantCard;