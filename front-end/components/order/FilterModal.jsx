import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '../../constants/Colors';

const FilterModal = ({ modalVisible, closeModal, setStatusFilter }) => {
  const { t } = useTranslation();
  const slideAnim = new Animated.Value(300); // Start position below screen

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible]);

  return (
    <Modal animationType="none" transparent visible={modalVisible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
              <Text style={styles.modalTitle}>{t('order.filter.title')}</Text>
              
              {['All', 'Pending', 'Processing', 'Delivered'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.modalButton}
                  onPress={() => {
                    setStatusFilter(status);
                    closeModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>{t(`order.filter.${status.toLowerCase()}`)}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>{t('order.filter.close_button')}</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalButton: {
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: "montserrat-bold"
  },
  closeButton: {
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "montserrat-bold"
  },
});

export default FilterModal;
