import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import axios from 'axios';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaG9hbmdraWVuMTIzIiwiYSI6ImNtMGl1ZW50bzBlb2Yya3M4bWNxZ2owbDUifQ.C7zMVaCdwHrEbk7BTAESYA';

const LocationAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocations = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    if (text.length < 3) return; // Avoid unnecessary API calls
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json`,
        {
          params: {
            access_token: MAPBOX_ACCESS_TOKEN,
            country: 'vn', // Only locations in Vietnam
            autocomplete: true,
            limit: 5,
          },
        }
      );
      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={suggestions}
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchLocations(text);
        }}
        flatListProps={{
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQuery(item.place_name);
                setSuggestions([]);
                onSelect(item); // Send selected location data to parent
              }}
            >
              <Text style={styles.itemText}>{item.place_name}</Text>
            </TouchableOpacity>
          ),
        }}
        placeholder="Search for a location in Vietnam"
        style={styles.input}
      />
      {loading && <ActivityIndicator style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loading: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default LocationAutocomplete;
