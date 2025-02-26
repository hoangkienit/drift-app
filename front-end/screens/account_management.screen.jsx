import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { getUserData } from '../utils/storageHelper';
import { useTranslation } from "react-i18next";

const AccountManagementScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    
      const fetchData = async () => {
        const data = await getUserData();
          if (data) {
            setUserData(data);
          }
    };
    
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });

        fetchData();
    })

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
        <Image source={{ uri: userData?.data?.user?.profileImg }} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userData?.data?.user?.username}</Text>
          <Text style={styles.email}>{userData?.data?.user?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.changeAvatarButton}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("EditProfile")}>
        <Ionicons name="person-outline" size={24} color={Colors.primary} />
        <Text style={styles.menuText}>{ t('profile.account_management.edit_profile_button') }</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ChangePassword")}>
        <Ionicons name="key-outline" size={24} color={Colors.primary} />
        <Text style={styles.menuText}>{ t('profile.account_management.change_pw_button') }</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Logging out...")}> 
        <Ionicons name="trash-sharp" size={24} color={'red'} />
        <Text style={[styles.menuText, {color: 'red'}]}>{ t('profile.account_management.delete_account') }</Text>
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
    fontSize: 16,
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
    fontSize: 18,
      marginLeft: 20,
    fontFamily: 'montserrat-medium'
  },
});

export default AccountManagementScreen;
