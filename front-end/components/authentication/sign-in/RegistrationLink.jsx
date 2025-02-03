import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RegistrationLink = ({ onPress, t }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.registerLink}>{ t('authentication.signin.signup_link')}</Text>
  </TouchableOpacity>
);

const styles = {
  registerLink: {
    textAlign: 'center',
    fontFamily: 'montserrat',
  },
};

export default RegistrationLink;
