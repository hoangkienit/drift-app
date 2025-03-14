import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomSwitch from "../../components/CustomSwitch";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const initialFoodList = [
  { id: "1", name: "Burger", price: "180.000d", image: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg", isAvailable: true },
  { id: "2", name: "Pizza", price: "8.99", image: "https://via.placeholder.com/50", isAvailable: false },
  { id: "3", name: "Sushi", price: "50.000d", image: "https://via.placeholder.com/50", isAvailable: false },
];

const FoodScreen = () => {
    const router = useRouter();
    const [foodList, setFoodList] = useState(initialFoodList);

    const toggleFoodAvailability = (id) => {
        setFoodList((prevList) =>
        prevList.map((food) => (food.id === id ? { ...food, isAvailable: !food.isAvailable } : food))
        );
    };

    return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 10, height: "100%"}}>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push('merchant/add_food')}>
                <Text style={styles.addButtonText}>+ Add Food</Text>
            </TouchableOpacity>

        <FlatList
            data={foodList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.foodCard}>
                <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.foodDetails}>
                <Text Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price}</Text>
            </View>
            <CustomSwitch value={item.isAvailable} onToggle={() => toggleFoodAvailability(item.id)} />
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
