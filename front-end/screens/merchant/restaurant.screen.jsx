import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSwitch from "../../components/CustomSwitch";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { getFoodData } from "../../utils/storageHelper";
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from "react-i18next";
import { formatToVND } from "../../utils/formatter";

const FoodScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [foodList, setFoodList] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchFoodFromStorage();
    }, [])
  );
  
  const fetchFoodFromStorage = async () => {
    const foods = await getFoodData();

    setFoodList(foods);
  }

    const toggleFoodAvailability = (id) => {
        setFoodList((prevList) =>
        prevList.map((food) => (food._id === id ? { ...food, status: food.status === 'available' ? 'unavailable' : 'available' } : food))
        );
    };

    return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 10, height: "100%"}}>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('merchant/add_food')}>
            <Text style={styles.addButtonText}>+ { t('merchant.restaurant.add_food_button')}</Text>
            </TouchableOpacity>

        <FlatList
            data={foodList}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{ textAlign: 'center', fontFamily: 'montserrat-bold', color: 'gray' }}>{ t('merchant.restaurant.empty_food')}</Text>
              </View>
            )}
            renderItem={({ item }) => (
            <View style={styles.foodCard}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
                <View style={styles.foodDetails}>
                  <Text Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>{formatToVND(item.price)}</Text>
                </View>
                <CustomSwitch value={item.status === 'available' ? true : false} onToggle={() => toggleFoodAvailability(item._id)} />
                <TouchableOpacity style={styles.nextButton}>
                  <Ionicons name="chevron-forward" size={24} color="#999" />
                </TouchableOpacity>
            </View>
            )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  addButton: { backgroundColor: Colors.primary, padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold",fontFamily: "montserrat-bold" },
  foodCard: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 10 },
  foodImage: { width: 50, height: 50, borderRadius: 2, marginRight: 12 },
  foodDetails: { flex: 1 },
  foodName: { fontSize: 16, fontFamily: "montserrat-bold" },
  foodPrice: { fontSize: 14, color: "#888", fontFamily: "montserrat-medium" },
  nextButton: { padding: 8 },
});

export default FoodScreen;
