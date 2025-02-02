import { View, TextInput, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const RestaurantHeader = ({ scrollY, t }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const headerOpacity = scrollY.interpolate({
    inputRange: [50, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.safeHeader, { paddingTop: insets.top, opacity: headerOpacity }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <TextInput placeholder={t('restaurant.detail.search_placeholder')} style={styles.searchBar} />
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  safeHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerBack: { padding: 10 },
  searchBar: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginLeft: 10,
  },
  searchIcon: { position: "absolute", right: 25 },
});

export default RestaurantHeader;
