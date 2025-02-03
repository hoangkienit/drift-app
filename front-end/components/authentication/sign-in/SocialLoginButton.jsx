import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const SocialLoginButton = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.socialButton} onPress={onPress}>
    <FontAwesome name={icon} size={20} color="#fff" />
    <Text style={styles.socialButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = {
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default SocialLoginButton;
