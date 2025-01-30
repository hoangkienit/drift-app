import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";
import { getLocation, truncateText } from "../utils/location";
import ImageCarousel from "../components/ImageCarousel";
import FoodCategory from "../components/FoodCategory";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const cartItemCount = 3; // Example cart count

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.headerContainer}>
        {/* Top Row: Location & Cart */}
        <View style={styles.topRow}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Location</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={18} color="black" />
              <Text style={styles.locationText}>
                {location
                  ? truncateText(
                      `${location.name || ""}, ${location.street || ""}, ${location.district || ""}, ${location.city || ""}, ${location.country || ""}`,
                      30
                    )
                  : "Loading..."}
              </Text>
            </View>
          </View>

          {/* Cart Icon with Badge */}
          <TouchableOpacity style={styles.cartContainer}>
            <Icon name="cart-outline" size={28} color={Colors.primary} />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View>
          <SearchBar/>
        </View>

        {/* Banner Slider */}
        <View>
          <ImageCarousel />
        </View>

        {/* Food Categories */}
        <View>
          <FoodCategory/>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    flexDirection: "column",
    paddingLeft: 20,
  },
  locationTitle: {
    fontSize: 12,
    color: "gray",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
    marginLeft: 5,
  },
  cartContainer: {
    position: "relative",
    padding: 10,
    paddingRight: 15,
  },
  badge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
