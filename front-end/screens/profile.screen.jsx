import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import UserProfileCategory from '../components/profile/UserProfileCategory';
import { useNavigation, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/Colors';
import { getUserData } from '../utils/storageHelper';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();
  const { t } = useTranslation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const data = await getUserData();
      if (data) {
        setUserData(data);
      }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

  }, []);

  useFocusEffect(
      React.useCallback(() => {
        fetchUserData();
      }, [])
    );
  return (
    <View style={styles.container}>
          <SafeAreaView>
              {/* User Information Header */}
          <View style={styles.header}>
            <Image
            source={{uri: userData?.data?.user?.profileImg}}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
            <Text style={styles.name}>{userData?.data?.user?.username}</Text>
              <Text style={styles.phone}>{userData?.data?.user?.email}</Text>
            </View>
          </View>
    
          {/* User Category */}
        <UserProfileCategory t={t} router={router}/>
          </SafeAreaView>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
      marginBottom: 5,
      color: "gray",
    fontFamily: 'montserrat-bold'
  },
  phone: {
    fontSize: 13,
      color: 'gray',
    fontFamily: 'montserrat-medium'
  },
    editButton: {
    width: 60,
    height: 60, 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
