import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { UserCategories } from '../constants/category';

const UserCategory = ({t}) => {
  return (
    <View style={styles.content}>
      {UserCategories.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
              <Text style={styles.text}>{ t(`profile.user_category.${item.key}`)}</Text>
          <Ionicons name={item.icon} size={24} color="#666" style={styles.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 10, 
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'space-between', // Push items to opposite sides
  },
  icon: {
    marginLeft: 'auto', // Moves the icon to the right
  },
  text: {
    fontFamily: 'montserrat-medium',
  }
});

export default UserCategory;
