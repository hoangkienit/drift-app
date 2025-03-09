import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FavoriteButton from "./FavoriteButton";

const RestaurantInfo = ({ name, description, rating, minutes, t }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.subtitleContainer}>
        {/* Rating Section */}
        <View style={styles.ratingContainer}>
            {rating > 0 ? (
          <>
          {[...Array(Math.floor(rating))].map((_, index) => (
            <Ionicons key={index} name="star" size={18} color="gold" />
          ))}
          {rating % 1 !== 0 && <Ionicons name="star-half" size={18} color="gold" />}
          <Text style={styles.ratingText}>{rating} (20 reviews)</Text>
          </>
          ) : (
              <Text style={styles.ratingText}>{ t('restaurant.detail.no_rating')}</Text>
          )}
        </View>

        <View>
          <Text style={styles.subtitle}>|</Text>
        </View>

        {/* Time Section */}
        <View style={styles.timeContainer}>
          <Ionicons name="time" size={18} color="gray" />
          <Text style={styles.subtitle}>{minutes} {t('restaurant.detail.minutes')}</Text>
        </View>
      </View>

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
  subtitleContainer: { flexDirection: "row", alignItems: "flex-start", justifyContent: 'space-around', marginTop: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  timeContainer: { flexDirection: "row", alignItems: "center", marginLeft: 15 },
  subtitle: { fontSize: 16, color: "gray", marginLeft: 5 },
  description: { fontSize: 14, marginTop: 10 },
  ratingText: { fontSize: 15, color: "gray", marginLeft: 5 },
});

export default RestaurantInfo;
