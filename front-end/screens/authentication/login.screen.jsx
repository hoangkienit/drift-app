import React, { useEffect, useState } from 'react';
import { View, Alert, TouchableWithoutFeedback, Keyboard, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';

// COMPONENTS
import Logo from '../../components/authentication/sign-in/Logo';
import InputField from '../../components/authentication/sign-in/InputField';
import LoginButton from '../../components/authentication/sign-in/LoginButton';
import SocialLoginButton from '../../components/authentication/sign-in/SocialLoginButton';
import ErrorMessage from '../../components/authentication/sign-in/ErrorMessage';
import ForgotPasswordLink from '../../components/authentication/sign-in/ForgotPasswordLink';
import RegistrationLink from '../../components/authentication/sign-in/RegistrationLink';
import OrDivider from '../../components/authentication/sign-in/OrDivider';

// API
import { login } from '../../api/authApi';

// UTILS
import { storeUserData } from '../../utils/storageHelper';

const Login = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null); // Clear the previous error

    // REMEMBER TO VALIDATION INPUT IN HERE BEFORE SEND IT TO BACKEND
    // if (!username || !password) {
    //   setError(t('authentication.signin.error_empty_fields'));
    //   return;
    // }

    setLoading(true);

    try {
      const data = await login(username, password);
      console.log(data);
      await storeUserData(data); // Store user data in local device

      setLoading(false);
      navigation.replace('(tabs)'); // Home after successful login
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Logo />
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>{t('authentication.signin.login_header')}</Text>
          <InputField
            icon="user"
            placeholder={t('authentication.signin.username')}
            value={username}
            onChangeText={setUsername}
          />
          <InputField
            icon="lock"
            placeholder={t('authentication.signin.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <ErrorMessage message={error} />}
          <LoginButton onPress={handleLogin} loading={loading} t={t} />
          <RegistrationLink onPress={() => navigation.push('authentication/sign-up/index')} t={t} />
          <ForgotPasswordLink onPress={() => Alert.alert('Forgot Password', 'Redirect to reset password')} t={t} />
          <OrDivider t={t} />
          
          <SocialLoginButton icon="facebook" text={t('authentication.signin.login_w_fb')} onPress={() => {
            setUsername('admin');
            setPassword('123456');
          }} />
          <SocialLoginButton icon="google" text={t('authentication.signin.login_w_gg')} onPress={() => {
            setUsername('hoangkien');
            setPassword('hoangkien123');
          }} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Login;
