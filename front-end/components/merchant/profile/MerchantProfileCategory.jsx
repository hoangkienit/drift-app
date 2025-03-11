import { View, Text, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import LogoutModal from '../../profile/LogoutModal';
import { clearUserData, clearAccessToken, clearRestaurantData } from '../../../utils/storageHelper';
import { APP_VERSION } from '../../../constants/constants';
import webSocketService from "../../../services/websocket.service";

const MerchantProfileCategory = ({ t, router, merchant }) => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isRestaurantOpened, setIsRestaurantOpened] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        merchant?.status === 'open' ? setIsRestaurantOpened(true) : setIsRestaurantOpened(false);
    }, []);

    const handleLogout = async () => {
        await clearUserData();
        await clearAccessToken();
        await clearRestaurantData();
        router.replace('/authentication/sign-in');
        setModalVisible(false);
    };

    const handleUpdateRestaurantStatus = (newStatus) => {
        const merchantId = merchant?._id;
        webSocketService.emit("UPDATE_RESTAURANT_STATUS", { merchantId, status: newStatus ? "open" : "closed" });
    }
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}>
    <View style={styles.content}>
      <Text style={styles.section_title}>{t('merchant.profile.information_category_section_title')}</Text>

      {/* Payment */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name={"card"} size={26} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.payment`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity style={styles.item} onPress={() => router.push('profile/account_management')}>
        <View style={styles.leftSection}>
          <FontAwesome name="user" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.manage_account`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>

      {/* Address */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name="location" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.address`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>
    </View>
      <View style={styles.content}>
        <Text style={styles.section_title}>{t('merchant.profile.status_category_section_title')}</Text>

        {/* Notifications */}
      <View style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name="notifications" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.notification`)}</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled(prev => !prev)}
        />
              </View>
        {/* Restaurant Status */}
        <View style={styles.item}>
        <View style={styles.leftSection}>
          <MaterialCommunityIcons name={isRestaurantOpened ? "store" : "store-off"} size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`merchant.profile.switch_restaurant_status`)}</Text>
        </View>
        <Switch
          value={isRestaurantOpened}
                        onValueChange={() => {
                            setIsRestaurantOpened(prevState => {
                            const newStatus = !prevState;
                            handleUpdateRestaurantStatus(newStatus);
                            return newStatus;
                        });
                    }}
        />
        </View>
      </View>
          

     <View style={styles.content}>
        <Text style={styles.section_title}>{t('merchant.profile.more_category_section_title')}</Text>

       {/* Settings */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name="settings" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.setting`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        
        {/* Privacy Policy */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name="lock-closed" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.privacy_policy`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        
        {/* Customer Support */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.leftSection}>
          <Ionicons name="help-circle" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.customer_support`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        {/* About Us */}
      <TouchableOpacity style={styles.item} onPress={() => router.push('/profile/about_us')}>
        <View style={styles.leftSection}>
          <FontAwesome name="building" size={24} color="#666" style={styles.icon}/>
          <Text style={styles.text}>{t(`profile.user_category.about_us`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>
        
        {/* Log Out */}
      <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
        <View style={styles.leftSection}>
          <Ionicons name="log-out" size={24} color="#666" style={styles.icon} />
          <Text style={styles.text}>{t(`profile.user_category.logout`)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#999" />
      </TouchableOpacity>
      </View>

      <LogoutModal
        visible={modalVisible}
        onConfirm={handleLogout}
        onCancel={() => setModalVisible(false)}
        t={t}
      />

     <View style={styles.app_author_container}>
              <Text style={styles.app_author}>{APP_VERSION}</Text>
        <Text style={styles.app_author}>{t('merchant.profile.app_author')} Hoangkienit</Text>
    </View> 
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    textAlign: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: 'montserrat-medium',
  },
  section_title: {
    fontFamily: 'montserrat-bold',
    fontSize: 14,
    marginBottom: 10,
  },
    app_author_container: {
  justifyContent: 'center',
  alignItems: 'center',
      marginTop: 20,
  paddingBottom: 50
},
  app_author: {
  flex: 1,
  textAlign: 'center',
  fontSize: 13, 
    color: '#fff',
  fontFamily: "montserrat-medium"
},
});

export default MerchantProfileCategory;
