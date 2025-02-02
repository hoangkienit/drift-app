import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FloatingBackButton = ({ scrollY }) => {
  const router = useRouter();

  const backButtonOpacity = scrollY.interpolate({
    inputRange: [50, 70],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.floatingBackContainer, { opacity: backButtonOpacity }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.floatingBack}>
        <Ionicons name="arrow-back-outline" size={35} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingBackContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 20,
  },
  floatingBack: {
    backgroundColor: "#666",
    borderRadius: 20,
  },
});

export default FloatingBackButton;
