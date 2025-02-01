import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function NotificationList({ notifications }) {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>{item.text}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    marginVertical: 4,
    borderRadius: 6
  },
  notificationText: {
    fontSize: 14
  }
});
