import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ message }) => (
  <Text style={styles.errorMessage}>{message}</Text>
);

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default ErrorMessage;
