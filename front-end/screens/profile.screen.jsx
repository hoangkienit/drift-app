import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react'
import UserProfileCategory from '../components/UserProfileCategory';
import { useNavigation } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })
  return (
    <View style={styles.container}>
          <SafeAreaView>
              {/* User Information Header */}
          <View style={styles.header}>
            <Image
              source={require('../assets/images/avatar.jpg')}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>Hoàng Kiện</Text>
              <Text style={styles.phone}>(+84)123456789</Text>
            </View>
          </View>
    
          {/* User Category */}
              <UserProfileCategory t={t} />
          </SafeAreaView>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: 20,
    marginTop: 50
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
