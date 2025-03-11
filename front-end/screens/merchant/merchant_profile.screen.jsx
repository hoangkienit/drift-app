import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import UserProfileCategory from '../../components/profile/UserProfileCategory';
import { useNavigation, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../constants/Colors';
import { getUserData } from '../../utils/storageHelper';
import { useFocusEffect } from '@react-navigation/native';
import { isDataEqual } from '../../utils/lodashCompare';
import MerchantProfileCategory from '../../components/merchant/profile/MerchantProfileCategory';
import { getRestaurantData } from '../../utils/storageHelper';

export default function MerchantProfileScreen() {
    const navigation = useNavigation();
  const { t } = useTranslation();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
    const [merchant, setMerchant] = useState(null);
    
    const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    const data = await getUserData();
    if (data && !isDataEqual(data, userData)) {
      setUserData(data);
    }
    };
    
    const fetchMerchantData = async () => {
        setLoading(true);
        const data = await getRestaurantData();
        if (data && !isDataEqual(data, merchant)) {
            setMerchant(data);
        }
        setLoading(false);
    }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    fetchUserData();
    fetchMerchantData();
  }, []);

  useFocusEffect(
      React.useCallback(() => {
          fetchUserData();
          fetchMerchantData();
      }, [])
    );
  return (
    <View style={styles.container}>
          <SafeAreaView> 
              {/* User Category */}
        {loading ? <ActivityIndicator size={"large"} color={"#fff"}/> : <MerchantProfileCategory t={t} router={router} merchant={merchant}/>}    
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
