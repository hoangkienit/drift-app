import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput, Animated, ScrollView } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing the icon

const ToppingModal = ({
  isVisible,
  onClose,
  toppings,
  selectedToppings,
  onToppingSelection,
  onAddToCart,
  children,
  t
}) => {
  const [note, setNote] = useState('');
  const fadeAnim = new Animated.Value(0);

  // Trigger fade-in animation when modal is visible
  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  // Prevent closing when clicking inside modal content
  const handleModalContentPress = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.modalBackground, { opacity: fadeAnim }]}>
          <View style={styles.modalContent} onStartShouldSetResponder={handleModalContentPress}>
            <Text style={styles.modalTitle}>{ t('restaurant.detail.adjust_title')}</Text>

            {/* ScrollView for the list of toppings */}
            <ScrollView style={styles.toppingList}>
              {toppings.map((topping, index) => (
                <View key={index} style={styles.toppingWrapper}>
                  <View style={styles.toppingRow}>
                    {/* Topping Name */}
                    <Text style={[styles.topping, selectedToppings.includes(topping) && styles.selectedTopping]}>
                      {topping}
                    </Text>

                    {/* Normal Checkbox on the right */}
                    <TouchableOpacity
                      onPress={() => onToppingSelection(topping)}
                      style={styles.checkboxContainer}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          selectedToppings.includes(topping) && styles.checkedCheckbox,
                        ]}
                      >
                        {/* Display the check icon when selected */}
                        {selectedToppings.includes(topping) && (
                          <Icon name="check" size={14} color="#fff" />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Add Note Section */}
            <View style={styles.noteSection}>
              <TextInput
                style={styles.noteInput}
                placeholder={t('restaurant.detail.enter_note')}
                placeholderTextColor={"black"}
                multiline
                numberOfLines={3}
                value={note}
                onChangeText={setNote}
              />
            </View>

            {/* Amount Adjuster */}
            {children}

            {/* Add to Cart Button */}
            <TouchableOpacity onPress={() => onAddToCart(note)} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>{ t('restaurant.detail.add_to_cart')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 320,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10, // Android shadow
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
  },
  toppingList: {
    maxHeight: 200,
  },
  toppingWrapper: {
    marginVertical: 5,
  },
  toppingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topping: {
    fontSize: 16,
    fontFamily: 'montserrat-medium',
    flex: 1,
  },
  selectedTopping: {
    color: Colors.primary,
  },
  checkboxContainer: {
    padding: 5,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: Colors.primary,
  },
  noteSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'montserrat-medium',
  },
  noteInput: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    fontFamily: 'montserrat-regular',
    textAlignVertical: 'top',
  },
  addToCartButton: {
    marginTop: 25,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'montserrat-medium',
  },
});

export default ToppingModal;
