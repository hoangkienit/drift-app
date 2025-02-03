import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrDivider = ({t}) => (
  <View style={styles.orContainer}>
    <View style={styles.orLine}></View>
    <Text style={styles.orText}>{ t('authentication.signin.or')}</Text>
    <View style={styles.orLine}></View>
  </View>
);

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  orLine: {
    height: 1,
    backgroundColor: '#ddd',
    flex: 1,
  },
  orText: {
    fontSize: 16,
    color: '#888',
    marginHorizontal: 10,
  },
});

export default OrDivider;
