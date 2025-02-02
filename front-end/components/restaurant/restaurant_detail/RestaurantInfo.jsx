import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FavoriteButton from "./FavoriteButton";

const RestaurantInfo = ({ name, rating, minutes, t }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.subtitleContainer}>
        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          {[...Array(Math.floor(rating))].map((_, index) => (
            <Ionicons key={index} name="star" size={18} color="gold" />
          ))}
          {rating % 1 !== 0 && <Ionicons name="star-half" size={18} color="gold" />}
          <Text style={styles.ratingText}>{rating} (20 reviews)</Text>
        </View>

        <Text style={styles.subtitle}>|</Text>

        {/* Time Section */}
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={18} color="gray" />
          <Text style={styles.subtitle}>{minutes} {t('restaurant.detail.minutes')}</Text>
        </View>
      </View>

      <Text style={styles.description}>Best dishes and food details here...</Text>

      {/* Favorite Button in Center-Right Position */}
      <FavoriteButton />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: "relative", // Allows absolute positioning for the FavoriteButton
  },
  title: { fontSize: 22, fontWeight: "bold" },
  subtitleContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  timeContainer: { flexDirection: "row", alignItems: "center", marginLeft: 15 },
  subtitle: { fontSize: 16, color: "gray", marginLeft: 5 },
  description: { fontSize: 14, marginTop: 10 },
  ratingText: { fontSize: 15, color: "gray", marginLeft: 5 },
});

export default RestaurantInfo;
