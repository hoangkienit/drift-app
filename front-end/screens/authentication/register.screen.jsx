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
  ActivityIndicator,
  Modal
} from 'react-native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { register } from '../../api/authApi';
import { Dropdown } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('client'); // Role selection
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const roles = [
    { label: t('authentication.signup.client_title'), value: 'client' },
    { label: t('authentication.signup.merchant_title'), value: 'merchant' },
    { label: t('authentication.signup.driver_title'), value: 'driver' }
  ];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

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
  }, []);

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    if (!username || !phone || !password || !confirmPassword || !role) {
      setLoading(false);
      setError(`${t('authentication.signup.error_empty_fields')}`);
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setError(`${t('authentication.signup.error_not_match_pw')}`);
      return;
    }

    try {
      await register(username, email, phone, password, role);
      setLoading(false);
      setModalVisible(true);
      //navigation.goBack();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={keyboardVisible}
      >
        <Image
          source={require('@/assets/images/splash_icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t('authentication.signup.signup_header')}</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder={t('authentication.signup.username')}
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder={t('authentication.signup.phone')}
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder={t('authentication.signup.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          placeholder={t('authentication.signup.cf_password')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#666"
        />

        {/* Role Selection Dropdown */}
        <View style={styles.dropdownWrapper}>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={roles}
            labelField="label"
            valueField="value"
            placeholder="Select a role"
            value={role}
            onChange={item => setRole(item.value)}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{t('authentication.signup.signup_button')}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>{t('authentication.signup.signin_link')}</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* 🔥 Modal for Success Message */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 {t('authentication.signup.modal_success_title')}</Text>
            <Text style={styles.modalMessage}>{t('authentication.signup.modal_success_message')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack(); // Navigate after closing modal
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: width * 0.8,
    height: height * 0.2,
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
  dropdownWrapper: {
    width: '100%',
    marginBottom: 15,
  },
  dropdown: {
    width: '100%',
    height: 50,
    backgroundColor: '#fafafa',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginTop: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.primary,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primary,
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
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  modalButton: { backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
