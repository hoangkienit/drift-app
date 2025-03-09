import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { truncateText } from "../../utils/location";

const LocationBar = ({ location }) => {
  return (
    <View style={styles.locationContainer}>
      <Text style={styles.locationTitle}>Location</Text>
      <View style={styles.locationRow}>
        <Icon name="location-outline" size={18} color="white" />
        <Text style={styles.locationText}>
          {location
            ? truncateText(
                `${location.name || ""}, ${location.street || ""}, ${location.district || ""}, ${location.city || ""}, ${location.country || ""}`,
                30
              )
            : "Loading..."}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  locationContainer: { flexDirection: "column", paddingLeft: 20 },
  locationTitle: { fontSize: 13, color: "white" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "montserrat-bold",
    marginLeft: 5,
    color: "white",
  },
};

export default LocationBar;
