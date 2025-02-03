import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

const LoginButton = ({ onPress, loading, t }) => (
  <TouchableOpacity style={styles.loginButton} onPress={onPress} disabled={loading}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
                <Text style={styles.loginButtonText}>{ t('authentication.signin.login_button')}</Text>
    )}
  </TouchableOpacity>
);

const styles = {
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default LoginButton;
