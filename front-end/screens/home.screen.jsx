import React, { useState, useEffect } from "react";
import { View, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { getLocation } from "../utils/location";
import HomeHeader from "../components/home/HomeHeader";
import HomeContent from "../components/home/HomeContent";
import {useCartStore} from "../stores/useCartStore"
import { getAllRestaurants } from "../api/merchantApi";
import { getAccessToken } from "../utils/storageHelper";
import { Colors } from "../constants/Colors";

export default function HomeScreen() {
  const { t } = useTranslation();
  const useCartStoreZustand = useCartStore();

  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    getLocation(setLocation);
    console.log(location);
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const restaurantRes = await getAllRestaurants(accessToken);

      setRestaurants(restaurantRes.data.restaurants);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    await fetchRestaurants();
    setLoading(false);
    setRefreshing(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: "100%" }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
          : <>
            <HomeHeader location={location} useCartStore={useCartStoreZustand} t={t} />
            <HomeContent t={t} restaurants={restaurants} refreshing={ refreshing} onRefresh={onRefresh} />
            </>
        }
      </View>
    </TouchableWithoutFeedback>
  );
}
