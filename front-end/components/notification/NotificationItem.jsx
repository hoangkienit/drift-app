import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

const NotificationItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Ionicons name={item.icon} size={30} color={Colors.primary} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  icon: { marginRight: 15 },

  textContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  message: { fontSize: 14, color: "#666", marginTop: 3 },
});

export default NotificationItem;
