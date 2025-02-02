import { Image, StyleSheet } from "react-native";

const RestaurantHeaderImage = ({ avatar }) => {
  return <Image source={{ uri: avatar }} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: { width: "100%", height: 250 },
});

export default RestaurantHeaderImage;
