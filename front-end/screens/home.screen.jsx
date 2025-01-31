import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../constants/Colors";
import { getLocation, truncateText } from "../utils/location";
import ImageCarousel from "../components/ImageCarousel";
import FoodCategory from "../components/FoodCategory";
import SearchBar from "../components/SearchBar";
import { useTranslation } from "react-i18next";
import FilterFacets from "../components/FilterFacets";
import RestaurantList from "../components/RestaurantList";

export default function HomeScreen() {
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const cartItemCount = 3; // Example cart count

  useEffect(() => {
    getLocation(setLocation);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={{ backgroundColor: Colors.primary }}>
          {/* Top Row: Location & Cart */}
          <View style={styles.topRow}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationTitle}>Location</Text>
              <View style={styles.locationRow}>
                <Icon name="location-outline" size={18} color="white" />
                <Text style={styles.locationText}>
                  {location
                    ? truncateText(
                        `${location.name || ""}, ${location.street || ""}, ${location.district || ""}, ${location.city || ""}, ${location.country || ""}`,
                        40
                      )
                    : "Loading..."}
                </Text>
              </View>
            </View>

            {/* Cart Icon with Badge */}
            <TouchableOpacity style={styles.cartContainer}>
              <Icon name="cart-outline" size={28} color={"white"} />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <SearchBar t={t} />
        </SafeAreaView>

        {/* Restaurant List Card */}
        <FlatList
          style={styles.restaurantList}
          ListHeaderComponent={
            <>
              <ImageCarousel nestedScrollEnabled={true} />
              <FoodCategory t={t} nestedScrollEnabled={true} />
              <FilterFacets t={t} />
            </>
          }
          data={[]} // Empty array to avoid unnecessary rendering
          keyExtractor={(_, index) => index.toString()}
          renderItem={null}
          ListEmptyComponent={<View style={{ height: 10 }} />}
          ListFooterComponent={<RestaurantList t={t} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 13,
    color: "white",
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
    color: "white",
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
  restaurantList: {
    flex: 1,
  }
});
