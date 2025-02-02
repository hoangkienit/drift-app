import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const FavoriteButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsLiked(!isLiked)} style={styles.favoriteButton}>
      <Ionicons name={isLiked ? "heart" : "heart-outline"} size={28} color={isLiked ? "red" : "black"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  favoriteButton: {
    position: "absolute",
    right: 20, // Positioned towards the right
    top: "50%", // Center vertically
    transform: [{ translateY: -14 }], // Adjust for proper centering
  },
});

export default FavoriteButton;
