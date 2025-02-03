import React from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../constants/Colors";

export default function CartModal({ visible, onClose, cartItems }) {
  // Get unique restaurant names in the cart
  const uniqueRestaurants = [...new Set(cartItems.map(item => item.restaurant))];
  const canPlaceOrder = uniqueRestaurants.length === 1;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* This TouchableWithoutFeedback will close the modal when clicking outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Your Orders</Text>

              {/* Order List */}
              <FlatList
                data={cartItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.orderItem}>
                    <Image source={{ uri: item.image }} style={styles.foodImage} />
                    <View style={styles.orderDetails}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      {/* Price check before applying toFixed */}
                      <Text style={styles.foodPrice}>
                        ${item.price ? item.price.toFixed(2) : "N/A"}
                      </Text>
                      <Text style={styles.restaurantName}>From: {item.restaurant}</Text>
                    </View>
                  </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No items in cart</Text>}
                contentContainerStyle={styles.contentContainer}
              />

              {/* Place Order Button */}
              <TouchableOpacity 
                style={[styles.placeOrderButton, !canPlaceOrder && styles.disabledButton]}
                disabled={!canPlaceOrder}
              >
                <Text style={styles.placeOrderText}>
                  {canPlaceOrder ? "Place Order" : "Order from 1 restaurant only"}
                </Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%", // Adjust the max height for the modal
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contentContainer: {
    paddingBottom: 20, // To ensure there's space at the bottom for buttons
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodPrice: {
    fontSize: 14,
    color: "#666",
  },
  restaurantName: {
    fontSize: 12,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 16,
    color: "#666",
  },
  placeOrderButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  placeOrderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
