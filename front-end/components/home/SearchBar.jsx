import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = ({ t }) => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const fullPlaceholder = t('home.search_bar_placeholder');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        let intervalId;

        if (placeholderIndex < fullPlaceholder.length) {
            intervalId = setInterval(() => {
                setPlaceholder(fullPlaceholder.substring(0, placeholderIndex + 1));
                setPlaceholderIndex(placeholderIndex + 1);
            }, 100); // Adjust typing speed here (milliseconds)
        } else {
            clearInterval(intervalId);

            //"reset" after it fully types out
            setTimeout(() => {
                setPlaceholder("");
                setPlaceholderIndex(0);
            }, 2000); //Wait 2 seconds, then reset 
        }

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, [placeholderIndex, fullPlaceholder]);


    return (
        <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="gray" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder={placeholder} // Use the dynamic placeholder
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
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
    shadowRadius: 4,
        marginBottom: 10
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
});

export default SearchBar;