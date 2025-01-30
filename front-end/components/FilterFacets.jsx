import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants/Colors';

const facetsData = [
  { label: 'Near Me', value: 'near_me' },
  { label: 'Recommend', value: 'recommend' },
  { label: 'Popular', value: 'popular' },
];

const FilterFacets = ({t}) => {
  const [selectedFacet, setSelectedFacet] = useState("near_me");

  const handleFacetChange = (facet) => {
    setSelectedFacet(facet);
  };

  return (
    <View>
      {/* Facet Buttons */}
      <View style={styles.facetContainer}>
        {facetsData.map((facet) => (
          <TouchableOpacity
            key={facet.value}
            style={[
              styles.facetButton,
              selectedFacet === facet.value && styles.selectedFacet,
            ]}
            onPress={() => handleFacetChange(facet.value)}
          >
            <Text
              style={[
                styles.facetText,
                selectedFacet === facet.value && styles.selectedText,
              ]}
            >
              {t(`home.facets.${facet.value}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  facetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  facetButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    width:"30%"
  },
  selectedFacet: {
      //backgroundColor: Colors.primary,
      borderBottomColor: Colors.primary,
      borderBottomWidth: 2
  },
  selectedText: {
    color: Colors.primary
  },
  facetText: {
    color: "#666",
      fontFamily: 'montserrat-bold',
    textAlign: "center"
  },
  facetContentContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  facetContentText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterFacets;
