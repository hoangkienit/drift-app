import React, { useState } from 'react';
import { View, Text, SafeAreaView, Animated, Easing, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import OrderFilterButton from '../components/order/OrderFilterButton';
import FilterModal from '../components/order/FilterModal';
import OrderList from '../components/order/OrderList';
import { Colors } from '../constants/Colors';
import { fakeOrders } from '../constants/data';

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
    fontSize: 22,
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
