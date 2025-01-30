import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react'
import UserCategory from '../components/UserCategory';
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
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome5 name="user-edit" size={22} color="white" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
    
          {/* User Category */}
              <UserCategory t={t} />
              
              <View style={styles.app_author_container}>
                  <Text style={styles.app_author}>App version: 1.0.1 BETA</Text>
                  <Text style={styles.app_author}>Developed by Hoangkienit & Minhsangit1008</Text>
            </View>
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
    backgroundColor: Colors.primary,
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
      color: "#fff",
    fontFamily: 'montserrat-bold'
  },
  phone: {
    fontSize: 13,
      color: '#fff',
    fontFamily: 'montserrat-medium'
  },
    editButton: {
    width: 60,
    height: 60, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 30,
    height: 22,
    },
    app_author_container: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},
app_author: {
  textAlign: 'center',
  fontSize: 13, 
    color: '#666',
  fontFamily: "montserrat-medium"
},
});
