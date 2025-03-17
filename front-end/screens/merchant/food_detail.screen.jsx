import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView,
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform,
  Modal,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { addNewFood, getFoodById, uploadFoodAvatar } from "../../api/merchantApi";
import { getAccessToken, getRestaurantData, storeFoodData } from "../../utils/storageHelper";


const FoodDetailScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const { foodId } = useLocalSearchParams();
    const [foodName, setFoodName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const categoryOptions = [
        { label: t('merchant.add_food.category_appetizer'), value: 'appetizer' },
        { label: t('merchant.add_food.category_main_course'), value: 'main_course' },
        { label: t('merchant.add_food.category_dessert'), value: 'dessert' },
        { label: t('merchant.add_food.category_drink'), value: 'drink' },
        { label: t('merchant.add_food.category_other'), value: 'other' },
    ];
  
    useEffect(() => {
        navigation.setOptions({
            headerTitle: t('merchant.food_detail.header_title'),
        headerLeft: () => (
            <TouchableOpacity onPressIn={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#fff",
        });
        fetchFoodData();
    }, [navigation, t]);
    
    const fetchFoodData = async () => {
        try {
            setError(null);
            setLoading(true);
            const foodRes = await getFoodById(foodId, await getAccessToken());

            const food = foodRes.data.food;
            setFoodName(food.name);
            setDescription(food.description);
            setPrice(food.price);
            setDisplayPrice(formatNumber(price));
            setCategory(food.category);

            setLoading(true);
        } catch (error) {
            setError({message: error?.message || 'System Error'});
            setLoading(false);
        }
    }

  const selectImage = async () => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (status === "denied") {
          Alert.alert(
            t('profile.account_management.permission_denied'),
            t('profile.account_management.denied_message'),
            [
              { text: t('profile.account_management.alert_cancel_button'), style: "cancel" },
              { text: t('profile.account_management.alert_open_setting_button'), onPress: () => Linking.openSettings() }
            ]
          );
          return;
        }
    
        if (status !== "granted") {
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });
    
        if (!result.canceled) {
          const selectedImage = result.assets[0].uri;
          setImage(selectedImage);
        } else {
          console.log("User cancelled image selection");
        }
      } catch (error) {
        console.error("Error selecting image:", error);
    } finally {
      console.log(image);
      }
  };

  const handleAddFood = async() => {
    try {
      setError(null);
      setLoading(true);

      if (!foodName || !description || !category || !price) {
        setError({ message: t('merchant.add_food.error_empty_field') });
        setLoading(false);
        return;
      }

      // TODO: validate input

      const merchant = await getRestaurantData();
      const accessToken = await getAccessToken();

      const foodImgRes = await uploadFoodAvatar(accessToken, image);

      const response = await addNewFood(
        merchant._id,
        accessToken,
        foodName,
        description,
        price,
        category,
        foodImgRes.data.food_img
      );

      await storeFoodData(response.data.foods);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setError({ message: error?.message || "System error" });
      setLoading(false);
    } 
  };

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/\D/g, "");

    // Convert to number
    const amount = numericValue ? parseInt(numericValue, 10) : 0;

    // Update state
    setPrice(amount); // Store as number
    setDisplayPrice(formatNumber(amount)); // Format for display
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPressIn={selectImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.foodImage} />
              ) : (
                <Text style={styles.imagePlaceholder}>+ {t('merchant.add_food.add_image_button')}</Text>
              )}
            </TouchableOpacity>
            {error && <Text style={{ fontFamily: "montserrat-bold", color: "red" }}>*{ error.message}</Text>}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('merchant.add_food.food_name_input')}</Text>
              <TextInput
                style={styles.input}
                value={foodName}
                onChangeText={setFoodName}
                placeholder={t('merchant.add_food.food_name_input_placeholder')}
                placeholderTextColor="#999"
              />
            </View>

            {loading && <View style={styles.loaderContainer}>
                <View style={styles.loaderBox}>
                    <ActivityIndicator size="large" color={"#ffff"} />
                </View>
            </View>}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('merchant.add_food.food_description_input')}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder={t('merchant.add_food.food_description_input_placeholder')}
                multiline
                numberOfLines={3}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('merchant.add_food.food_price_input')}</Text>
              <View style={styles.priceContainer}>
                <TextInput
                  style={styles.priceInput}
                  value={displayPrice}
                  onChangeText={handleChange}
                  placeholder={t('merchant.add_food.food_price_input_placeholder')}
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
                <Text style={styles.currency}>VND</Text>
              </View>
            </View>

            {/* Open Modal */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('merchant.add_food.food_category_picker')}</Text>
              <TouchableOpacity style={styles.pickerButton} onPressIn={() => setModalVisible(true)}>
                <Text style={category ? styles.selectedText : styles.placeholderText}>
                  {category ? t(`merchant.add_food.category_${category}`) : t('merchant.add_food.food_category_placeholder')}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPressIn={handleAddFood} disabled={loading}>
              {loading ? <ActivityIndicator size={"small"} color={"#fff"}></ActivityIndicator>: <Text style={styles.addButtonText}>{t('merchant.add_food.add_food_button')}</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      {/* Category Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t('merchant.add_food.food_category_picker')}</Text>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.categoryOption}
                onPress={() => {
                  setCategory(option.value);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.categoryText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{t('merchant.add_food.cancel_modal_button')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginLeft: 15,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    height: 120,
    width: 120,
    alignSelf: "center",
    marginBottom: 16,
  },
  foodImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f8f8",
  },
  priceInput: {
    flex: 1,
    height: 45,
  },
  currency: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 12,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    padding: 12,
    justifyContent: "space-between",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  categoryOption: {
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
    },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
      pointerEvents: "auto",
    height: "auto"
  },
  loaderBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  inputAndroid: {
    height: 45,
    fontSize: 16,
    paddingHorizontal: 12,
    },
};

export default FoodDetailScreen;
