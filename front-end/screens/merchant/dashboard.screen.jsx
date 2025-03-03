import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [restaurant, setRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate fetching restaurant data
  useEffect(() => {
    setTimeout(() => {
      // const fakeRestaurant = {
      //   id: '1',
      //   name: 'Golden Sushi',
      //   owner: 'John Doe',
      //   revenue: '$12,340',
      //   orders: 128,
      //   status: 'Open',
      //   customers: 567,
      //   reviews: 234,
      //   menuItems: 24,
      //   lastOrders: [
      //     { orderID: '#OD101', customer: 'Alice', amount: '$23.50', status: 'Completed' },
      //     { orderID: '#OD102', customer: 'Bob', amount: '$18.75', status: 'Pending' },
      //     { orderID: '#OD103', customer: 'Charlie', amount: '$30.00', status: 'Completed' },
      //   ],
      // };

      
    }, 1000);
  }, []);

  useFocusEffect(
      React.useCallback(() => {
        fetchRestaurantData();
      }, [navigation])
  );
  
  const fetchRestaurantData = async() => {
      const fakeRestaurant = null;

      setRestaurant(fakeRestaurant);
      setModalVisible(!fakeRestaurant);
      setLoading(false);
  }

  const handleCreateRestaurant = () => {
    router.push('merchant/create-restaurant');
    setModalVisible(false);
  };

  const handleRefresh = () => {
    setLoading(true);
  // Simulate fetching new data
  setTimeout(() => {
    setRestaurant({ ...restaurant, revenue: '$19,500' });
    setLoading(false);
  }, 2000);
};

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
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
      <TouchableOpacity style={styles.logOutButton}>
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
          <View style={styles.headerRow}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <TouchableOpacity onPress={handleRefresh}>
                <MaterialIcons name="refresh" size={37} color={Colors.primary} style={styles.refreshIcon}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.ownerText}>Owner: {restaurant.owner}</Text>

          {/* KEY METRICS */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <FontAwesome5 name="dollar-sign" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.revenue}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="receipt-sharp" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.orders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="food" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.menuItems}</Text>
              <Text style={styles.statLabel}>Menu Items</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="people" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.customers}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="star" size={24} color={Colors.primary} />
              <Text style={styles.statValue}>{restaurant.reviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons
                name={restaurant.status === 'Open' ? 'checkmark-circle' : 'close-circle'}
                size={24}
                color={restaurant.status === 'Open' ? 'green' : 'red'}
              />
              <Text style={[styles.statValue, restaurant.status === 'Open' ? styles.open : styles.closed]}>
                {restaurant.status}
              </Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>

          {/* RECENT ORDERS */}
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <FlatList
            data={restaurant.lastOrders}
            keyExtractor={(item) => item.orderID}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.orderCustomer}>[{item.orderID}]</Text>
                <Text style={styles.orderCustomer}>{item.customer}</Text>
                <Text style={styles.orderAmount}>{item.amount}</Text>
                <Text style={[styles.orderStatus, item.status === 'Completed' ? styles.completed : styles.pending]}>
                  {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 30
  },
  header: {
    position: 'absolute', // Make it full width at the top
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    elevation: 3,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ownerText: {
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  open: {
    color: 'green',
  },
  closed: {
    color: 'red',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
    fontSize: 16,
    fontWeight: 'bold',
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
});