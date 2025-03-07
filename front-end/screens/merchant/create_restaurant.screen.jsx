import { useNavigation } from "expo-router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { 
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity,
  ScrollView, Platform, TouchableWithoutFeedback, Keyboard,  Modal, FlatList, ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { translateRestaurantCategory } from "../../utils/translate";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { validateMerchantRegister } from "../../utils/validation";
import { createNewRestaurant } from "../../api/merchantApi";
import { getAccessToken, getUserData } from "../../utils/storageHelper";


const CreateRestaurantScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();


  useLayoutEffect(() => {
    navigation.setOptions({
      title: t('merchant.create_restaurant.title_header'),
      headerStyle: { backgroundColor: Colors.primary },
      headerTitleStyle: { color: "#fff", fontWeight: "bold", fontFamily: "montserrat-bold" },
      headerTintColor: "#fff",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [categories, setCategories] = useState([
    { label: translateRestaurantCategory("fast_food"), value: "fast_food" },
    { label: translateRestaurantCategory("casual_dining"), value: "casual_dining" },
    { label: translateRestaurantCategory("fine_dining"), value: "fine_dining" },
    { label: translateRestaurantCategory("cafe"), value: "cafe" },
    { label: translateRestaurantCategory("bakery"), value: "bakery" },
    { label: translateRestaurantCategory("other"), value: "other" },
  ]);

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantDescription, setRestaurantDescription] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalType, setModalType] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json")
      .then((res) => res.json())
      .then((data) => {
        setCities(Object.keys(data).map((city) => ({ label: city, value: data[city].code })));
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
  if (!selectedCity) return;

  fetch(`https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${selectedCity?.value}.json`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.district) return;
      setDistricts(data.district.map((d) => ({ label: d.name, value: d.name })));
      setSelectedDistrict(null);  // Reset district khi đổi city
      setWards([]);  // Reset ward khi đổi city
    })
    .catch((err) => console.error("Error fetching districts:", err));
}, [selectedCity]);


  useEffect(() => {
  if (!selectedDistrict || !selectedCity) return;

  fetch(`https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/${selectedCity?.value}.json`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.district) return;
      const districtData = data.district.find((d) => d.name === selectedDistrict?.label);
      if (!districtData || !Array.isArray(districtData.ward)) return;
      
      setWards(districtData.ward.map((w) => ({ label: w.name, value: w.name })));
      setSelectedWard(null);  // Reset ward when district changes
    })
    .catch((err) => console.error("Error fetching wards:", err));
}, [selectedDistrict, selectedCity]);


  const openModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalVisible(true);
  };

  const handleSelect = (item) => {
    if (modalType === "category") setSelectedCategory(item);
    if (modalType === "city") setSelectedCity(item);
    if (modalType === "district") setSelectedDistrict(item);
    if (modalType === "ward") setSelectedWard(item);
    setModalVisible(false);
  };

  const handleRegister = async () => {
    
    try {
      setLoading(true);
      setError(null);
      const err = validateMerchantRegister(restaurantName, restaurantDescription, houseNumber, streetName, t);
      if (err != null) {
        setError({ message: err });
      }
      const user = await getUserData();
      const accessToken = await getAccessToken();
      const response = await createNewRestaurant(
                user.data?.user?._id,
                accessToken,
                restaurantName,
                restaurantDescription,
                selectedCategory?.value,
                houseNumber,
                streetName,
                selectedCity?.label,
                selectedDistrict?.label,
        selectedWard?.label);
      
      console.log(response?.data?.merchant?.address?.house_number);

      setLoading(false);
      
    } catch (error) {
      console.error("Error in merchant API: ", error);
      setError({ message: error.message });
    }
  }

  

  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
        >
        <ScrollView 
          contentContainerStyle={{ padding: 10, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          nestedScrollEnabled={true} 
          >
            {error && <Text style={styles.errorText}>*{error.message}</Text>}
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.restaurant_name')} placeholderTextColor={'gray'} onChangeText={setRestaurantName}/>
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.restaurant_description')} placeholderTextColor={'gray'} onChangeText={setRestaurantDescription}/>
          
            <TouchableOpacity onPressIn={() => { openModal("category", categories); Keyboard.dismiss() }}>
            <Text style={styles.textInput}>{selectedCategory?.label || t('merchant.create_restaurant.choose_category')}</Text>
          </TouchableOpacity>

          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.house_number')} placeholderTextColor={'gray'} onChangeText={setHouseNumber}/>
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.street_name')} placeholderTextColor={'gray'} onChangeText={setStreetName}/>

            <TouchableOpacity onPressIn={() => { openModal("city", cities); Keyboard.dismiss() }}>
            <Text style={styles.textInput}>{selectedCity?.label || t('merchant.create_restaurant.choose_city')}</Text>
          </TouchableOpacity>

            <TouchableOpacity onPressIn={() => { openModal("district", districts); Keyboard.dismiss() }} disabled={!selectedCity}>
            <Text style={styles.textInput}>{selectedDistrict?.label || t('merchant.create_restaurant.choose_district')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPressIn={() => openModal("ward", wards)} disabled={!selectedDistrict}>
            <Text style={styles.textInput}>{selectedWard?.label || t('merchant.create_restaurant.choose_ward')}</Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPressIn={handleRegister}>
              {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.registerText}>{t('merchant.create_restaurant.register_button')}</Text>}
            
          </TouchableOpacity>
        </ScrollView> 

        <Modal visible={modalVisible} animationType="fade" transparent pointerEvents="auto">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={modalData}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <Text style={styles.modalItem}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPressIn={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>{ t('merchant.create_restaurant.close_modal_button')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </GestureHandlerRootView>
);

};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentWrapper: { padding: 10, flexGrow: 1 },
  textInput: { borderWidth: 1, padding: 15, marginBottom: 15, borderRadius: 5, backgroundColor: "#fff", fontFamily: "montserrat-medium" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%",height: "60%" },
  modalItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", fontFamily: "montserrat-medium" },
  modalClose: { textAlign: "center", color: "red", marginTop: 10, fontFamily: "montserrat-medium" },
  registerButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 4
  },
  registerText: {
    textAlign: 'center',
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16
  },
  errorText: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    color: "red",
    padding: 5
  }
});

export default CreateRestaurantScreen;
