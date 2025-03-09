import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import RestaurantDetailScreen from "../../screens/restaurant_detail.screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RestaurantDetail = () => {
  const { data } = useLocalSearchParams();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const parsedData = data ? JSON.parse(data) : null;
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <RestaurantDetailScreen props={parsedData} t={t} />
  );
};

export default RestaurantDetail;
