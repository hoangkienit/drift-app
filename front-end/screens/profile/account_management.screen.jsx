import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, Linking, Modal, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { getUserData, getAccessToken, storeUserData, clearUserData } from '../../utils/storageHelper';
import { useTranslation } from "react-i18next";
import { router, useRouter } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import { updateAvatar } from "../../api/userApi";
import { isDataEqual } from "../../utils/lodashCompare";

const AccountManagementScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
     
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });    
  }, [navigation]);

  const fetchUserData = async () => {
        try {
          const data = await getUserData();
        if (data && !isDataEqual(data, userData)) {
          setUserData(data);
        }
        } catch (error) {
          console.log("Error");
        }
      };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const pickImage = async () => {
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
      handleUpdateAvatar(selectedImage);
    } else {
      console.log("User cancelled image selection");
    }
  } catch (error) {
    console.error("Error selecting image:", error);
  }
  };
  
  const handleUpdateAvatar = async (imageUri) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const response = await updateAvatar(userData?._id, accessToken, imageUri);
      
      // Clear the old user data and replace with the new
      clearUserData();
      await storeUserData(response.data.user);

      fetchUserData();

      setModalMessage(`✅ ${t('profile.account_management.avatar_update_success')}`);
      setModalVisible(true);
    } catch (error) {
      setModalMessage(t('profile.account_management.avatar_update_failed'));
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
              <Text style={styles.headerTitle}>{ t('profile.account_management.title') }</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: userData?.profileImg }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData?.username}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
        </View>
        <TouchableOpacity style={styles.changeAvatarButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="#fff" />
          {/* {loading ? <ActivityIndicator size="large" color="#fff" /> : <Ionicons name="camera" size={24} color="#fff" />} */}
        </TouchableOpacity>
      </View>

      {loading && <View style={styles.loaderContainer}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color={"#ffff"} />
        </View>
      </View>}

      {/* Notification Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={ async () => {
        router.push({
          pathname: "/profile/account_management/edit_information",
          params: {
            userId: userData?._id,
            accessToken: await getAccessToken(),
            username: userData?.username,
            phone: userData?.phone,
            email: userData?.email
          }
        });
      }}>
        <Ionicons name="person-outline" size={24} color={Colors.primary} />
        <Text style={[styles.menuText, {color: Colors.primary}]}>{ t('profile.account_management.edit_profile_button') }</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={async () => {
        router.push({
          pathname: "/profile/account_management/update_password",
          params: {
            userId: userData?.data?.user?._id,
            accessToken: await getAccessToken(),
          }
        });
      }}>
        <Ionicons name="key-outline" size={24} color={Colors.primary} />
        <Text style={[styles.menuText, {color: Colors.primary}]}>{ t('profile.account_management.change_pw_button') }</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Logging out...")}> 
        <Ionicons name="trash-sharp" size={24} color={Colors.primary} />
        <Text style={[styles.menuText, {color: Colors.primary}]}>{ t('profile.account_management.delete_account') }</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 24,
    borderBottomWidth: 1,
      borderBottomColor: "#eee",
    marginHorizontal: 10
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'montserrat-bold'
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    //borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  changeAvatarButton: {
    padding: 10,
  },
  name: {
    fontSize: 20,
      fontWeight: "bold",
      color: '#fff',
      fontFamily: 'montserrat-bold'
  },
  email: {
    fontSize: 13,
      color: "#f6f6f6",
    fontFamily: 'montserrat-medium'
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
      marginLeft: 20,
    fontFamily: 'montserrat-medium'
  },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: 300, backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
  modalText: { fontSize: 16, marginBottom: 10, fontFamily: 'montserrat-medium' },
  modalButton: { backgroundColor: Colors.primary, padding: 10, borderRadius: 5, paddingHorizontal: 20 },
  modalButtonText: { color: "#fff", fontSize: 16, fontFamily: 'montserrat-medium' },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
    pointerEvents: "auto",
  },
  loaderBox: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AccountManagementScreen;
