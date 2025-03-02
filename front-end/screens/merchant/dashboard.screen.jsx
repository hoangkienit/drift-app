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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

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

      const fakeRestaurant = null;

      setRestaurant(fakeRestaurant);
      setModalVisible(!fakeRestaurant);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateRestaurant = () => {
    router.replace('merchant/create-restaurant');
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
            <Text style={styles.modalTitle}>No Restaurant Found</Text>
            <Text style={styles.modalText}>
              You need to create a restaurant to access the dashboard.
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateRestaurant}
            >
              <Text style={styles.createButtonText}>+ Create Restaurant</Text>
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
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalContent: {
  width: '85%',
  backgroundColor: 'white',
  padding: 25,
  borderRadius: 15,
  alignItems: 'center',
  elevation: 5, // Adds shadow on Android
  shadowColor: '#000', // Adds shadow on iOS
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 10,
},
modalText: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
  marginBottom: 20,
},
createButton: {
  backgroundColor: '#ff6f00',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 10,
  elevation: 2,
  shadowColor: '#ff6f00',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
createButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  },
loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});