import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartModal from "./CartModal";

const CartIcon = ({ useCartStore, t }) => {
  const [cartVisible, setCartVisible] = useState(false); // Modal visibility state
  const { cart } = useCartStore;

  return (
    <>
      {/* Cart Icon */}
      <TouchableOpacity
        style={styles.cartContainer}
        onPress={() => setCartVisible(true)} // Open modal when clicked
      >
        <Icon name="cart-outline" size={28} color={"white"} />
        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Cart Modal */}
      <CartModal
        visible={cartVisible}
        onClose={() => setCartVisible(false)} // Close modal
        useCartStore={useCartStore}
        t ={t}
      />
    </>
  );
};

const styles = {
  cartContainer: { position: "relative", padding: 10, paddingRight: 15 },
  badge: {
    position: "absolute",
    right: 5,
    top: 5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
};

export default CartIcon;
