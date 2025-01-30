import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    
  return (
    <View style={styles.searchContainer}>
          <Icon name="search-outline" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            placeholderTextColor="gray"
            value={search}
            onChangeText={setSearch}
          />
        </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 10,
        marginHorizontal: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
});

export default SearchBar