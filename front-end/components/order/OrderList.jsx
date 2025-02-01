import React from 'react';
import { FlatList } from 'react-native';
import OrderCard from './OrderCard';

const OrderList = ({ filteredOrders}) => {
  const renderItem = ({ item }) => <OrderCard item={item}/>;
  
  return (
    <FlatList
      data={filteredOrders}
      keyExtractor={(item) => item.orderId}
      renderItem={renderItem}
    />
  );
};

export default OrderList;
