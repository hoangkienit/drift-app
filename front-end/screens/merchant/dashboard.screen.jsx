import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from 'react-native-vector-icons';

export default function DashboardScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Simulate fetching restaurant data
  useEffect(() => {
    setTimeout(() => {
      const fakeRestaurant = {
        id: '1',
        name: 'Golden Sushi',
        owner: 'John Doe',
        revenue: '$12,340',
        orders: 128,
        status: 'Open',
        customers: 567,
        reviews: 234,
        menuItems: 24,
        lastOrders: [
          { id: '101', customer: 'Alice', amount: '$23.50', status: 'Completed' },
          { id: '102', customer: 'Bob', amount: '$18.75', status: 'Pending' },
          { id: '103', customer: 'Charlie', amount: '$30.00', status: 'Completed' },
        ],
      };

      // Change null to fakeRestaurant to test different states
      setRestaurant(fakeRestaurant);
      setModalVisible(!fakeRestaurant);
    }, 1000);
  }, []);

  const handleCreateRestaurant = () => {
    Alert.alert('Create Restaurant', 'Navigate to create restaurant screen');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* NO RESTAURANT MODAL */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
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
      {restaurant && (
        <View style={styles.dashboard}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.ownerText}>Owner: {restaurant.owner}</Text>

          {/* KEY METRICS */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <FontAwesome5 name="dollar-sign" size={24} color="#ff6f00" />
              <Text style={styles.statValue}>{restaurant.revenue}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="receipt-outline" size={24} color="#ff6f00" />
              <Text style={styles.statValue}>{restaurant.orders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="food" size={24} color="#ff6f00" />
              <Text style={styles.statValue}>{restaurant.menuItems}</Text>
              <Text style={styles.statLabel}>Menu Items</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="people-outline" size={24} color="#ff6f00" />
              <Text style={styles.statValue}>{restaurant.customers}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="star-outline" size={24} color="#ff6f00" />
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
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
  },
  header: {
    backgroundColor: '#ff6f00',
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
});