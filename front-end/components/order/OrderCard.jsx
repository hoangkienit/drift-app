import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { translateStatus } from '../../utils/translate';

const OrderCard = ({ item }) => {
  const { t } = useTranslation();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { backgroundColor: '#FFA500' };
      case 'Processing': return { backgroundColor: '#4A90E2' };
      case 'Delivered': return { backgroundColor: '#32CD32' };
      default: return { backgroundColor: '#000' };
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case 'Pending': return 'time'; // Example icon
      case 'Processing': return 'hourglass'; // Example icon
      case 'Delivered': return 'checkmark-done'; // Example icon
      default: return 'alert-circle'; // Default icon
    }
  };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.restaurantAvatar }} style={styles.avatar} />
        <View style={styles.orderDetails}>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <Text style={styles.orderDateTime}>{t('order.card.order_time')}: {item.orderDateTime}</Text>
          <Text style={styles.shipperName}>{t('order.card.shipper')}: {item.shipperName}</Text>
        </View>
      </View>

      {/* Row for Status and Total Price */}
      <View style={styles.rowBetween}>
        <View style={[styles.statusBox, getStatusStyle(item.status)]}>
          <Ionicons name={getIcon(item.status)} size={16} color="white" style={styles.statusIcon} />
          <Text style={styles.statusText}>{translateStatus(item.status)}</Text>
        </View>

        {/* Total Price displayed next to status */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{t('order.card.total')}: {`$${item.totalPrice.toFixed(2)}`}</Text>
        </View>
      </View>

      {/* Chevron icon placed at the center-right */}
      <Ionicons name="chevron-forward" size={20} color="#666" style={styles.chevronIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
        position: 'relative',
        marginHorizontal: 10,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
  orderDateTime: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'montserrat-medium',
  },
  shipperName: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'montserrat-medium',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'montserrat-bold',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#666',
  },
  statusIcon: {
    marginRight: 5, // Space between icon and text
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'montserrat-bold',
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  chevronIcon: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -10 }], // To center it vertically
  },
});

export default OrderCard;
