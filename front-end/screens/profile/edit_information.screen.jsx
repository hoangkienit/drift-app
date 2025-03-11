import { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, 
  Keyboard, TouchableWithoutFeedback, Modal 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Colors } from "../../constants/Colors";
import { updateUserInfo } from "../../api/userApi";


// UTILS
import { storeUserData, clearUserData } from '../../utils/storageHelper';
import { isDataEqual } from "../../utils/lodashCompare";

export default function EditInformationScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('profile.account_management.edit_account_information.header_title'),
      headerLeft: () => (
        <TouchableOpacity onPressIn={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "#fff",
    });
  }, [navigation, t]);

  const [phone, setPhone] = useState(params.phone || "");
  const [email, setEmail] = useState(params.email || "");
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [language, setLanguage] = useState("en");
  const [userId, setUserId] = useState(params.userId || "");
  const [accessToken, setAccessToken] = useState(params.accessToken || "");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("userLanguage");
        if (storedLanguage && !isDataEqual(storedLanguage, language)) {
          setLanguage(storedLanguage);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);
    
  const messages = {
      en: {
        phoneError: "Phone number must be between 10-15 digits.",
        emailError: "Email must be a valid Gmail address (example@gmail.com).",
        success: "Account information updated!",
      },
      vi: {
        phoneError: "Số điện thoại phải có từ 10-15 chữ số.",
        emailError: "Email phải là một địa chỉ Gmail hợp lệ (example@gmail.com).",
        success: "Thông tin tài khoản đã được cập nhật!",
      }
    };

  const handleChange = (field, value) => {
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);
    setIsChanged(true);
  };

  const handleSave = async () => {
    const newErrors = {};
    const lang = messages[language] || messages.vi;

    if (!/^[0-9]{10,15}$/.test(phone)) {
      newErrors.phone = lang.phoneError;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    } else if (!email.endsWith("@gmail.com")) {
      newErrors.email = lang.emailError;
    }
      
    if (!phone.trim()) {
        newErrors.phone = lang.phoneError;
      }
      
    if (!email.trim()) {
        newErrors.email = lang.emailError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log(userId, accessToken, phone, email);
      const user = await updateUserInfo(userId, accessToken, phone, email);
      setErrors({});
      setModalVisible(true); // Show success modal
        Keyboard.dismiss();
        
      // Update user in AsyncStorage
      await clearUserData();
      await storeUserData(user);

        
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>{t('profile.account_management.edit_account_information.username')}</Text>
        <TextInput value={params.username} editable={false} style={styles.inputDisabled} />

        <Text style={styles.label}>{t('profile.account_management.edit_account_information.phone')}</Text>
        <TextInput
          value={phone}
          onChangeText={(text) => handleChange("phone", text)}
          style={[styles.input, errors.phone && styles.inputError]}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(text) => handleChange("email", text)}
          style={[styles.input, errors.email && styles.inputError]}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TouchableOpacity
          style={[styles.saveButton, !isChanged && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isChanged}
        >
          <Text style={styles.saveButtonText}>
            {t('profile.account_management.edit_account_information.save_button')}
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>{messages[language].success}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa"
  },
  backButton: {
    marginLeft: 10
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#fff"
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#e9ecef",
    color: "#888",
    marginTop: 5
  },
  inputError: {
    borderColor: "red"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center"
  },
  saveButtonDisabled: {
    backgroundColor: "#ccc"
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20
  },
  modalButton: {
    backgroundColor: Colors.primary,
      padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14
  }
});
