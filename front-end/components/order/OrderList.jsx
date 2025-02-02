import React from 'react';
import { FlatList, Text, View } from 'react-native';
import OrderCard from './OrderCard';

const OrderList = ({ filteredOrders }) => {
  const renderItem = ({ item }) => <OrderCard item={item} />;
  
  // Check if there are no orders
  if (filteredOrders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No orders available.</Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={filteredOrders}
      keyExtractor={(item) => item.orderId}
      renderItem={renderItem}
    />
  );
};

export default OrderList;
