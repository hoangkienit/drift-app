import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import RestaurantCard from "../components/home/RestaurantCard"; 
import { useTranslation } from "react-i18next";

const FavoriteScreen = () => {
    const { t } = useTranslation();
  const [favorites, setFavorites] = useState([]); // Empty list initially

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="heart-outline" size={80} color="gray" />
                  <Text style={styles.emptyText}>{t('favorite.no_favorite_restaurant')}</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RestaurantCard {...item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
});

export default FavoriteScreen;
