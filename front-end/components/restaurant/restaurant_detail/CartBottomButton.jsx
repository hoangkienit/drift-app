import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CartModal from '../../home/cart/CartModal';
import { Colors } from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const CartBottomButton = ({ useCartStore, t }) => {
    const { cart } = useCartStore;
    const [cartVisible, setCartVisible] = useState(false);

    const handleCartButtonPress = () => {
        setCartVisible(true);
    };

    return (
        <View>
            {cart.length > 0 && (
                <View style={styles.cartButtonContainer}>
                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={handleCartButtonPress}
                    >
                        <Text style={styles.cartButtonText}>{t('restaurant.detail.cart_title') }</Text>
                        {/* Cart icon and count */}
                        <View style={styles.cartIconContainer}>
                            <Text style={styles.cartItemCount}>({cart.length})</Text>
                            <Icon name="shopping-cart" size={24} color="#fff" />
                        </View>
                
                    </TouchableOpacity>
                </View>
            )}

            {/* Cart Modal */}
            <CartModal
                visible={cartVisible}
                onClose={() => setCartVisible(false)} // Close modal
                useCartStore={useCartStore}
                t={t}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cartButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4
    },
    cartButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center',
    },
    cartIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10, // Space between icon and text
    },
    cartItemCount: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5, // Space between icon and count
    },
    cartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'montserrat-bold',
    },
});

export default CartBottomButton;
