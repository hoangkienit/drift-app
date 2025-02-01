import React, { useState } from 'react';
import { View, Text, SafeAreaView, Animated, Easing, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import OrderFilterButton from '../components/order/OrderFilterButton';
import FilterModal from '../components/order/FilterModal';
import OrderList from '../components/order/OrderList';
import { Colors } from '../constants/Colors';

const fakeOrders = [
  {
    orderId: 'ORD123456',
    restaurantAvatar: 'https://fastly.picsum.photos/id/47/4272/2848.jpg?hmac=G8dXSLa-ngBieraQt5EORu-4r6tveX3fhvBTZM0Y8xM',
    restaurantName: 'Pizza Palace',
    orderDateTime: '2025-02-01 14:30',
    totalPrice: 25.99,
    shipperName: 'Mike Brown',
    status: 'Pending',
  },
  {
    orderId: 'ORD123457',
    restaurantAvatar: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
    restaurantName: 'Sushi Express',
    orderDateTime: '2025-02-01 15:00',
    totalPrice: 18.50,
    shipperName: 'Sarah Lee',
    status: 'Processing',
  },
  {
    orderId: 'ORD123458',
    restaurantAvatar: 'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY',
    restaurantName: 'Burger Town',
    orderDateTime: '2025-02-01 16:00',
    totalPrice: 30.75,
    shipperName: 'David Smith',
    status: 'Delivered',
  },
];

const OrderScreen = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState(fakeOrders);
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = new Animated.Value(0);


  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'All') return true;
    return order.status === statusFilter;
  });

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.in(Easing.ease),
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: Colors.primary }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{t('order.header_title')}</Text>

          {/* Filter Button */}
          <OrderFilterButton openModal={openModal} statusFilter={statusFilter} />
        </View>
      </SafeAreaView>

      {/* Modal for Status Filter */}
      <FilterModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        setStatusFilter={setStatusFilter}
        slideAnim={slideAnim}
      />

      {/* Orders List */}
      <OrderList
        filteredOrders={filteredOrders.map((order) => ({
          ...order
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    fontFamily: 'montserrat-bold',
    color: '#fff',
  },
});

export default OrderScreen;
