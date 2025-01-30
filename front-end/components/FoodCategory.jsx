import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FoodCategories } from '../constants/category'

const FoodCategory = ({t}) => {
  return (
    <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{ t('home.category')}</Text>
          <FlatList
              style={{
                  paddingHorizontal: 20,
              }}
            data={FoodCategories}
              horizontal
              nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryItem}>
                    <View style={styles.categoryImageContainer}>
                      <Image source={item.image} style={styles.categoryImage} />
                    </View>
                    <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: "#fff",
        borderRadius: 14,
        marginHorizontal: 10,
        marginVertical: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 4,

    },
    categoryTitle: {
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "montserrat-medium",
        marginVertical: 5,
        marginLeft: 20,
    },
    categoryItem: {
        alignItems: "center",
        marginRight: 15,
        paddingVertical: 7
    },
    categoryImageContainer: {
        backgroundColor: "#fff", // White background
        padding: 10, // Padding around the image
        borderRadius: 50, // Rounded border
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // For Android
    },
    categoryImage: {
        width: 40,
        height: 40,
        borderRadius: 30,
    },
    categoryText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'montserrat'
    },
});

export default FoodCategory