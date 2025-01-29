import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors'; // Customize with your colors
import { FontAwesome } from '@expo/vector-icons'; // For icons
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogin = () => {
    // if (!email || !password) {
      //   Alert.alert('Validation', 'Please enter both email and password.');
      //   return;
      // }
      // Alert.alert('Success', 'Logged in successfully!');
      
      Keyboard.dismiss();
      navigation.replace('(tabs)'); //Home
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/splash_icon.png')} // Replace with your logo image path
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>{t('authentication.signin.login_header')}</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#333"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t('authentication.signin.email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#666666"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color="#333"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={t('authentication.signin.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666666"
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>{t('authentication.signin.login_button')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace('authentication/sign-up/index')}
          >
            <Text style={styles.registerLink}>
              {t('authentication.signin.signup_link')}
            </Text>
          </TouchableOpacity>

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() =>
              Alert.alert('Forgot Password', 'Redirect to reset password')
            }
          >
            <Text style={styles.forgotPasswordText}>{t('authentication.signin.forgot_password')}</Text>
          </TouchableOpacity>

          {/* Centered Line with "or" */}
          <View style={styles.orContainer}>
            <View style={styles.orLine}></View>
            <Text style={styles.orText}>{t('authentication.signin.or')}</Text>
            <View style={styles.orLine}></View>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialLoginContainer}>
            {/* Facebook Login Button */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert('Facebook Login', 'Redirect to Facebook login')
              }
            >
              <FontAwesome name="facebook" size={20} color="#fff" />
              <Text style={styles.socialButtonText}>{t('authentication.signin.login_w_fb')}</Text>
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert('Google Login', 'Redirect to Google login')
              }
            >
              <FontAwesome name="google" size={20} color="#fff" />
              <Text style={styles.socialButtonText}>{t('authentication.signin.login_w_gg')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
  },
  logo: {
    width: width * 0.8, // Adjust width based on screen size
    height: height * 0.2, // Adjust height based on screen size
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    paddingVertical: 30,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
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
  registerLink: {
    textAlign: 'center',
    fontFamily: 'montserrat',
  },
  forgotPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  socialLoginContainer: {
    marginTop: 20,
  },
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
});
