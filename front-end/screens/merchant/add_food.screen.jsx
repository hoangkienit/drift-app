import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform 
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
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('profile.account_management.edit_account_information.header_title'),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
    if (!foodName || !description || !category || !price || !image) {
      alert("Please fill in all fields.");
      return;
    }

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
        <View style={styles.container}>
          <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.foodImage} />
            ) : (
              <Text style={styles.imagePlaceholder}>+ Add Image</Text>
            )}
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Food Name</Text>
            <TextInput
              style={styles.input}
              value={foodName}
              onChangeText={setFoodName}
              placeholder="Enter food name"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
              numberOfLines={3}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter category"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
            <Text style={styles.addButtonText}>Add Food</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  addButton: {
    backgroundColor: "#007bff",
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
});

export default AddFoodScreen;
