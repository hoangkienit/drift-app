import { useNavigation } from "expo-router";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { 
  View, Text, StyleSheet, TextInput, KeyboardAvoidingView, 
  ScrollView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Modal, FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import { translateRestaurantCategory } from "../../utils/translate";


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
    console.log(restaurantName, restaurantDescription, selectedCategory, houseNumber, streetName, selectedCity, selectedDistrict, selectedWard);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.restaurant_name')} placeholderTextColor={'gray'} onChangeText={setRestaurantName}/>
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.restaurant_description')} placeholderTextColor={'gray'} onChangeText={setRestaurantDescription}/>
      <TouchableOpacity onPress={() => openModal("category", categories)}>
        <Text style={styles.textInput}>{selectedCategory?.label || t('merchant.create_restaurant.choose_category')}</Text>
          </TouchableOpacity>
          
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.house_number')} placeholderTextColor={'gray'} onChangeText={setHouseNumber}/>
          <TextInput style={styles.textInput} placeholder={t('merchant.create_restaurant.street_name')} placeholderTextColor={'gray'} onChangeText={setStreetName}/>

      <TouchableOpacity onPress={() => openModal("city", cities)}>
        <Text style={styles.textInput}>{selectedCity?.label || t('merchant.create_restaurant.choose_city')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal("district", districts)} disabled={!selectedCity}>
        <Text style={styles.textInput}>{selectedDistrict?.label || t('merchant.create_restaurant.choose_district')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal("ward", wards)} disabled={!selectedDistrict}>
        <Text style={styles.textInput}>{selectedWard?.label || t('merchant.create_restaurant.choose_ward')}</Text>
      </TouchableOpacity>
          
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>{t('merchant.create_restaurant.register_button')}</Text>
      </TouchableOpacity>
        </ScrollView> 
        <Modal visible={modalVisible} animationType="fade" transparent>
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
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>{ t('merchant.create_restaurant.close_modal_button')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
  </KeyboardAvoidingView>
  
</TouchableWithoutFeedback>
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
  }
});

export default CreateRestaurantScreen;
