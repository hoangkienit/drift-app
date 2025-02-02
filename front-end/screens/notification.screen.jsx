import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useState } from "react";
import NotificationItem from "../components/notification/NotificationItem";
import { Colors } from "../constants/Colors";
import { translateNotificationTabBar } from "../utils/translate";
import { notifications } from "../constants/data";

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredNotifications =
    selectedTab === "All"
      ? notifications
      : notifications.filter((item) => item.type === selectedTab);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Full Header Background */}
        <View style={styles.header}>
          <View style={styles.tabContainer}>
            {["All", "Order", "Promotion"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab && styles.activeTabText,
                  ]}
                >
                  {translateNotificationTabBar(tab)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notification List */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: "#fef5f5" },
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  /** TABS **/
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#fff", // White underline for active tab
  },

  tabText: { fontSize: 16, color: "#fff", opacity: 0.7, fontFamily: "montserrat-medium" },
  activeTabText: { color: "#fff", fontWeight: "bold", opacity: 1, fontFamily: "montserrat-bold" },

  /** LIST CONTAINER **/
  listContainer: { padding: 10 },
});

export default NotificationScreen;
