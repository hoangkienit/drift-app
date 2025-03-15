import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getMerchantFoods, getRecentOrders, getRestaurant } from '../../api/merchantApi';
import { getAccessToken, getUserData, clearAccessToken, clearUserData, storeRestaurantData, getRestaurantData, storeFoodData } from "../../utils/storageHelper";
import { isDataEqual } from '../../utils/lodashCompare';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();


  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [owner, setOwner] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
  try {
    setLoading(true);
    const user = await getUserData();
    const accessToken = await getAccessToken();
    const restaurantRes = await getRestaurant(user._id, accessToken);
    const orderRes = await getRecentOrders(user._id, accessToken);
    const foodRes = await getMerchantFoods(restaurantRes.data.restaurant._id, accessToken);

    const newRestaurant = restaurantRes.data.restaurant;
    const newOrders = orderRes.data.recent_order;
    const newOwner = user.username;

    // Compare new data with existing state
    if (
      isDataEqual(newRestaurant, restaurant) &&
      isDataEqual(newOrders, orders) &&
      isDataEqual(newOwner, owner)
    ) {
      return; // Exit early if data hasn't changed
    }

    if (!newRestaurant) {
      setModalVisible(true);
    } else {
      await storeRestaurantData(newRestaurant);
      await storeFoodData(foodRes.data.foods);

      setModalVisible(false);
      setRestaurant(newRestaurant);
      setOrders(newOrders);
      setOwner(newOwner);
    }
  } catch (error) {
    setError({ message: t('merchant.dashboard.error_system') + error.message});
    setTimeout(() => setError(null), 5000);
  } finally {
    setLoading(false);
  }
};

useFocusEffect(
  useCallback(() => {
    fetchData();
  }, [])
);

const handleRefresh = async () => {
  setLoading(true);
  await fetchData();
  setLoading(false);
};

  const handleCreateRestaurant = () => {
    router.push('merchant/create-restaurant');
    setModalVisible(false);
  };

  const handleLogout = async() => {
    await clearAccessToken();
    await clearUserData();
    router.replace('authentication/sign-in');
  }


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{ t('merchant.dashboard.header_title')}</Text>
        <Ionicons name="notifications-sharp" size={24} color="white" />
      </View>

      {/* NO RESTAURANT MODAL */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{ t('merchant.no_restaurant_modal.modal_title')}</Text>
            <Text style={styles.modalText}>
              { t('merchant.no_restaurant_modal.modal_message')}
            </Text>
            {/* Create Restaurant Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateRestaurant}>
        <FontAwesome name="plus" size={18} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.createButtonText}>
          {t("merchant.no_restaurant_modal.create_restaurant_button")}
        </Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={18} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.logOutButtonText}>
          {t("merchant.no_restaurant_modal.log_out_button")}
        </Text>
      </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* RESTAURANT DASHBOARD */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : restaurant && (
          <View style={styles.dashboard}>
            {error && <Text style={styles.errorText}>*{ error.message}</Text>}
          <View style={styles.headerRow}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <TouchableOpacity onPress={handleRefresh}>
                <MaterialIcons name="refresh" size={37} color={Colors.primary} style={styles.refreshIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.ownerText}>{ t('merchant.dashboard.owner')}: {owner}</Text>

          {/* KEY METRICS */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <FontAwesome5 name="dollar-sign" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.revenue}</Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.revenue')}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="receipt-sharp" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{orders.length}</Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.orders')}</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="food" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.foods.length}</Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.menu_items')}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="star" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.rating}</Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.rating')}</Text>
            </View>
              <View style={styles.statCard}>
                <Ionicons name="chatbubbles-sharp" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.reviews.length}</Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.reviews')}</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons
                name={restaurant.status === 'open' ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={restaurant.status === 'open' ? 'green' : 'red'}
              />
              <Text style={[styles.statValue, restaurant.status === 'open' ? styles.open : styles.closed]}>
                {restaurant.status == 'open' ? t('merchant.dashboard.status_open') : t('merchant.dashboard.status_close')}
              </Text>
              <Text style={styles.statLabel}>{ t('merchant.dashboard.status')}</Text>
            </View>
          </View>

          {/* RECENT ORDERS */}
          <Text style={styles.sectionTitle}>{ t('merchant.dashboard.recent_orders')}</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderID}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.orderCustomer}>{item.orderID}</Text>
                <Text style={styles.orderCustomer}>{item.customer}</Text>
                <Text style={styles.orderAmount}>{item.amount}</Text>
                
              </View>
              )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{ t('merchant.dashboard.no_orders_available')}</Text>
              </View>
            }
            scrollEnabled={orders.length != 0}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    height: hp(100)
  },
  header: {
    position: 'absolute', // Make it full width at the top
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(11)
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshIcon: {
    marginLeft: 10,
  },
  dashboard: {
    padding: hp(2),
    width: "95%",
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 3,
    marginTop: hp(13)
  },
  restaurantName: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'montserrat-bold'
  },
  ownerText: {
    fontSize: hp(2),
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: hp(1.7),
    color: '#333',
    marginTop: 5,
    fontFamily: "montserrat-bold"
  },
  statLabel: {
    fontSize: hp(1.5),
    color: '#666',
    fontFamily: "montserrat-medium"
  },
  open: {
    color: 'green',
  },
  closed: {
    color: 'red',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    fontFamily: 'montserrat-bold'
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderCustomer: {
    fontSize: 16,
  },
  orderAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "montserrat-medium"
  },
  orderStatus: {
    fontSize: 16,
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
   modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  createButton: {
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%"
  },
  logOutButton: {
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "80%"
  },
  buttonIcon: {
    marginRight: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logOutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: {
    fontFamily: "montserrat-medium",
    color: 'red',
    fontSize: hp(1.8)
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});