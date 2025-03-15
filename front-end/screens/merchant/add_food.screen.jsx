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
  Modal
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';


const AddFoodScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

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
      headerTitle: t('merchant.add_food.header_title'),
      headerLeft: () => (
        <TouchableOpacity onPressIn={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "#fff",
    });
  }, [navigation, t]);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddFood = () => {
    setError(null);

    if (!foodName || !description || !category || !price) {
      setError({message: t('merchant.add_food.error_empty_field')})
      return;
    }

    // TODO: validate input

    const newFood = {
      id: Date.now().toString(),
      name: foodName,
      description,
      category,
      price: `${price}đ`,
      image,
      isAvailable: true,
    };

    console.log("New Food:", newFood);
    navigation.goBack(); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
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
                  value={price}
                  onChangeText={setPrice}
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

            <TouchableOpacity style={styles.addButton} onPressIn={handleAddFood}>
              <Text style={styles.addButtonText}>{t('merchant.add_food.add_food_button')}</Text>
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
    width: 100,
    height: 100,
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

export default AddFoodScreen;
