import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

const ForgotPasswordLink = ({ onPress, t }) => (
  <TouchableOpacity style={styles.forgotPasswordContainer} onPress={onPress}>
    <Text style={styles.forgotPasswordText}>{ t('authentication.signin.forgot_password')}</Text>
  </TouchableOpacity>
);

const styles = {
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default ForgotPasswordLink;
