import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import RestaurantDetailScreen from "../../screens/RestaurantDetail.screen";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RestaurantDetail = () => {
  const { id, name, avatar, rating, distance, minutes } = useLocalSearchParams();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <RestaurantDetailScreen props={{ id, name, avatar, rating, distance, minutes }} t={t} />
  );
};

export default RestaurantDetail;
