import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, SafeAreaView, TextInput, Image } from "react-native";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RestaurantDetailScreen = ({ props, t }) => {
  const { id, name, rating, minutes, avatar } = props; // Changed distance to rating
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // Get SafeArea insets

  // State to track if the heart is toggled
  const [isLiked, setIsLiked] = useState(false);

  // Interpolation for showing header
  const headerOpacity = scrollY.interpolate({
    inputRange: [50, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Interpolation for hiding floating button
  const backButtonOpacity = scrollY.interpolate({
    inputRange: [50, 70],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Toggle the heart icon
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      {/* SafeArea Header */}
      <Animated.View style={[styles.safeHeader, { paddingTop: insets.top, opacity: headerOpacity }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <TextInput placeholder={t('restaurant.detail.search_placeholder')} style={styles.searchBar} />
          <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        </View>
      </Animated.View>

      {/* Floating Back Button */}
      <Animated.View style={[styles.floatingBackContainer, { opacity: backButtonOpacity }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.floatingBack}>
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Scrollable Content */}
      <ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Restaurant Image */}
        <Image source={{ uri: avatar }} style={styles.image} />

        {/* Restaurant Info */}
        <View style={styles.content_container}>
          <View style={styles.content}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.subtitleContainer}>
              <View style={styles.ratingContainer}>
                {[...Array(Math.floor(rating))].map((_, index) => (
                  <Ionicons key={index} name="star" size={18} color="gold" />
                ))}
                {rating % 1 !== 0 && (
                  <Ionicons name="star-half" size={18} color="gold" />
                )}
                {/* Display the rating */}
                <Text style={styles.ratingText}>{rating} (20 reviews)</Text>
              </View>
              <Text style={styles.subtitle}>|</Text>
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={18} color="gray" />
                <Text style={styles.subtitle}>{minutes} {t('restaurant.detail.minutes')}</Text>
              </View>
            </View>
            <Text style={styles.description}>Best dishes and food details here...</Text>
          </View>

          {/* Favorite */}
          <View style={styles.heartIconContainer}>
            <TouchableOpacity onPress={toggleHeart}>
              <Ionicons 
                name={isLiked ? "heart" : "heart-outline"} 
                size={28} 
                color={isLiked ? "red" : "black"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },

  // SafeArea Header
  safeHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "white",
  },

  // Animated Header
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
    fontFamily: "montserrat-medium",
  },

  searchIcon: {
    position: "absolute",
    right: 25,
  },

  // Floating Back Button
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

  // Restaurant Image
  image: { width: "100%", height: 250 },

    // Content
    content_container: {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10
  },
  content: { padding: 20},
  title: { fontSize: 22, fontWeight: "bold" },
  subtitleContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  ratingContainer: { flexDirection: "row", alignItems: "center" },
  timeContainer: { flexDirection: "row", alignItems: "center", marginLeft: 15 },
  subtitle: { fontSize: 16, color: "gray", marginLeft: 5, fontFamily: "montserrat-medium" },
  description: { fontSize: 14, marginTop: 10 },

  // Rating Text Style
  ratingText: {
    fontSize: 15,
    color: "gray",
      marginLeft: 5,
    fontFamily: "montserrat-medium"
  },

  // Heart Icon Container
  heartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});

export default RestaurantDetailScreen;
