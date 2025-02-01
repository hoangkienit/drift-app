import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const FilterModal = ({ modalVisible, closeModal, setStatusFilter, slideAnim }) => {
  return (
    <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
      <View style={styles.modalBackdrop}>
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }] }]}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Order Status</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setStatusFilter('All'); closeModal(); }}>
              <Text style={styles.modalButtonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setStatusFilter('Pending'); closeModal(); }}>
              <Text style={styles.modalButtonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setStatusFilter('Processing'); closeModal(); }}>
              <Text style={styles.modalButtonText}>Processing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => { setStatusFilter('Delivered'); closeModal(); }}>
              <Text style={styles.modalButtonText}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 10,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FilterModal;
