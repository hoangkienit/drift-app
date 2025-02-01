import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NotificationCategory({ category, selectedCategory, setSelectedCategory }) {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === category && styles.activeCategory]}
      onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8
  },
  activeCategory: {
    backgroundColor: '#ff6347'
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});
