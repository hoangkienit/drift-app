import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../../constants/Colors";

export default function CartModal({ visible, onClose, useCartStore, t }) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCartStore;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveItem = (item) => {
    setItemToRemove(item);
    setShowConfirmModal(true);
  };

  const confirmRemoveItem = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setShowConfirmModal(false);
    }
  };

  const cancelRemoveItem = () => {
    setShowConfirmModal(false);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{t('home.cart_modal.title')}</Text>

              {/* Order List */}
              <FlatList
                data={cart}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.orderItem}>
                    <Image source={{ uri: item.img }} style={styles.foodImage} />
                    <View style={styles.orderDetails}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      
                      {/* Toppings */}
                      {item.toppings && item.toppings.length > 0 && (
                        <>
                          <Text style={styles.foodToppings}>Toppings: {item.toppings.join(", ")}</Text>
                        </>
                      )}

                      {/* Note */}
                      {item.note && item.note !== "" && item.note !== " " && (
                        <>
                          <Text style={styles.foodToppings}>Note: {item.note}</Text>
                        </>
                      )}
                      
                      <Text style={styles.foodPrice}>${item.price ? item.price.toFixed(2) : "N/A"}</Text>
                    </View>

                    {/* Quantity Adjuster */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) {
                          handleRemoveItem(item); // Show confirmation modal instead of removing directly
                        } else {
                          updateQuantity(item.id, newQuantity);
                        }
                      }}>
                        <Icon name="remove-circle-outline" size={24} color={item.quantity > 1 ? Colors.primary : "red"} />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Icon name="add-circle-outline" size={24} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>{t('home.cart_modal.empty_cart')}</Text>}
                contentContainerStyle={styles.contentContainer}
              />

              {/* Total Price */}
              { cart.length === 0 ? <Text style={styles.totalPrice}></Text> : <Text style={styles.totalPrice}>{t('home.cart_modal.total_price')}: ${totalAmount().toFixed(2)}</Text>}

              {/* Place Order Button */}
              <TouchableOpacity style={[styles.placeOrderButton, cart.length === 0 && styles.disabledButton]} disabled={cart.length === 0}>
                <Text style={styles.placeOrderText}>{t('home.cart_modal.place_order')}</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon name="close" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

      {/* Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={cancelRemoveItem}
      >
        <TouchableWithoutFeedback onPress={cancelRemoveItem}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.confirmModalContainer}>
                <Text style={styles.confirmTitle}>{t('home.cart_modal.confirm_remove_title')}</Text>
                <Text style={styles.confirmMessage}>{t('home.cart_modal.confirm_remove_message')}</Text>

                <View style={styles.confirmButtons}>
                  <TouchableOpacity onPress={cancelRemoveItem} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>{t('home.cart_modal.cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={confirmRemoveItem} style={styles.confirmButton}>
                    <Text style={styles.confirmText}>{t('home.cart_modal.confirm')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    maxHeight: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: 'montserrat-bold',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  foodImage: {
    width: 70,
    height: 70,
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
  foodToppings: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  foodPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: 'montserrat-medium'
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 18,
    color: "#666",
    fontFamily: 'montserrat-medium',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'montserrat-medium',
  },
  placeOrderButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  placeOrderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'montserrat-bold',
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  confirmModalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'montserrat-medium'
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'montserrat-medium'
  },
});
