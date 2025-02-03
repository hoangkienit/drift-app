import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from 'expo-router'; // For navigation
import { Colors } from '@/constants/Colors'; // Customize colors
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const showSubscription = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const handleRegister = () => {
    // Reset error message
    setError('');
    setLoading(true);

    // Validate inputs
    if (!username || !phone || !password || !confirmPassword) {
      setLoading(false);
      setError(`${t('authentication.signup.error_empty_fields')}`);
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setError(`${t('authentication.signup.error_not_match_pw')}`);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Account created successfully!');
      navigation.replace('authentication/sign-in/index');
    }, 2000); // Simulate loading time
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Offset for iOS
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardVisible}
      >
        <Image
          source={require('@/assets/images/splash_icon.png')} // Replace with your logo image path
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{ t('authentication.signup.signup_header')}</Text>

        {/* Display error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder={ t('authentication.signup.username')}
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#666"
        />

        {/* Phone Input */}
        <TextInput
          style={styles.input}
          placeholder={ t('authentication.signup.phone')}
          value={phone}
          onChangeText={setPhone}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder={ t('authentication.signup.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        {/* Confirm Password Input */}
        <TextInput
          style={styles.input}
          placeholder={ t('authentication.signup.cf_password')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{ t('authentication.signup.signup_button')}</Text>
          )}
        </TouchableOpacity>

        {/* Navigate to Login */}
        <TouchableOpacity onPress={() => navigation.replace('authentication/sign-in/index')}>
          <Text style={styles.loginLink}>{ t('authentication.signup.signin_link')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.8, // Adjust width based on screen size
    height: height * 0.2, // Adjust height based on screen size
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'montserrat',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
