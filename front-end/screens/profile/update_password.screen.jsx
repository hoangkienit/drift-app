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
import { updatePassword } from "../../api/userApi";

export default function UpdatePasswordScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('profile.account_management.update_password.header_title'),
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: "#fff",
    });
  }, [navigation, t]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState("en");
    
  const [userId, setUserId] = useState(params.userId || "");
  const [accessToken, setAccessToken] = useState(params.accessToken || "");

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("userLanguage");
        if (storedLanguage) {
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
      passwordError: "Password must be at least 6 characters.",
      confirmError: "Passwords do not match.",
      success: "Password updated successfully!",
    },
    vi: {
      passwordError: "Mật khẩu phải có ít nhất 6 ký tự.",
      confirmError: "Mật khẩu không khớp.",
      success: "Cập nhật mật khẩu thành công!",
    }
  };

  const handleChange = (field, value) => {
    if (field === "currentPassword") setCurrentPassword(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    setIsChanged(true);
  };
    
    const clearTheInputs = () => {
        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
    }

  const handleSave = async () => {
    const newErrors = {};
    const lang = messages[language] || messages.vi;

    if (newPassword.length < 6) {
      newErrors.newPassword = lang.passwordError;
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = lang.confirmError;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updatePassword(userId, accessToken, currentPassword, newPassword);
      setErrors({});
      setModalVisible(true);
      clearTheInputs();
      Keyboard.dismiss();
    } catch (error) {
        console.log(error?.response?.data?.message);
        setErrors({ serverError: error?.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>{t('profile.account_management.update_password.current_password')}</Text>
        <TextInput
          value={currentPassword}
          onChangeText={(text) => handleChange("currentPassword", text)}
          style={styles.input}
          secureTextEntry
        />
        
        <Text style={styles.label}>{t('profile.account_management.update_password.new_password')}</Text>
        <TextInput
          value={newPassword}
          onChangeText={(text) => handleChange("newPassword", text)}
          style={[styles.input, errors.newPassword && styles.inputError]}
          secureTextEntry
        />
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

        <Text style={styles.label}>{t('profile.account_management.update_password.confirm_password')}</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          secureTextEntry
        />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
              
              {errors.serverError && <Text style={styles.errorText}>{errors.serverError}</Text>}

        <TouchableOpacity
          style={[styles.saveButton, !isChanged && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!isChanged}
        >
          <Text style={styles.saveButtonText}>{t('profile.account_management.update_password.save_button')}</Text>
        </TouchableOpacity>
              
              {/* <TouchableOpacity
          style={[styles.saveButton]}
                  onPress={() => {
                      setCurrentPassword("123456");
                      setConfirmPassword("$$$$$$");
                      setNewPassword("$$$$$$");
                  }}
        >
          <Text style={styles.saveButtonText}>Data</Text>
        </TouchableOpacity> */}

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
    backgroundColor: "#f8f9fa",
  },
  backButton: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#ccc",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

