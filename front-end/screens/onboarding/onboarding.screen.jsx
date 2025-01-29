import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { onBoardingSlides } from '@/configs/constants';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SCREEN_WIDTH } from '@/themes/app.constant';
import { Colors } from '@/constants/Colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from '../../services/translation';
import { useTranslation } from 'react-i18next';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in effect
  const slideAnim = useRef(new Animated.Value(50)).current; // For slide-up effect

  // For language translation
  const { t } = useTranslation();

  // Modal visibility state
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    AsyncStorage.getItem('userLanguage').then((language) => {
      if (language) {
        setSelectedLanguage(language);
      }
    });

    // Trigger animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLanguageSwitch = (language) => {
    i18n.changeLanguage(language);
    AsyncStorage.setItem('userLanguage', language);
    setSelectedLanguage(language);
    setModalVisible(false); // Close the modal after switching language
  };

  const renderItem = ({ item }) => (
    <View style={[styles.container, { backgroundColor: item.color }]}>
      <Animated.Image
        source={item.image}
        style={[
          {
            width: SCREEN_WIDTH - 80,
            height: 400,
            opacity: fadeAnim, // Fade-in animation
            transform: [{ translateY: slideAnim }], // Slide-up animation
          },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        {t('onboarding.title_' + item.id)}
      </Animated.Text>
      <Animated.Text style={[styles.description, { opacity: fadeAnim }]}>
        {t('onboarding.desc_' + item.id)}
      </Animated.Text>
    </View>
  );

  const renderSkipButton = () => (
    <TouchableOpacity style={styles.skipButton} onPress={() => {
      navigation.replace("authentication/sign-in/index");
    }}>
      <Text style={styles.skipText}>{t('onboarding.skip_button')}</Text>
    </TouchableOpacity>
  );

  const renderDoneButton = () => (
    <TouchableOpacity style={styles.finishButton} onPress={() => {
      navigation.replace("authentication/sign-in/index");
    }}>
      <Icon name="check" size={22} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Language Switcher */}
      <TouchableOpacity
        style={styles.languageSwitcher}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.languageSwitcherContent}>
          <Icon name="globe" size={20} color={Colors.primary} style={styles.languageIcon} />
          <Text style={styles.languageText}>{i18n.language.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('onboarding.select_language')}</Text>
            <TouchableOpacity
              style={[styles.modalOption, selectedLanguage === 'en' && styles.disabledOption]}
              onPress={() => handleLanguageSwitch('en')}
              disabled={selectedLanguage === 'en'}
            >
              <Text style={[styles.modalText, selectedLanguage === 'en' && styles.disabledText]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalOption, selectedLanguage === 'en' && styles.disabledOption]}
              onPress={() => handleLanguageSwitch('vi')}
              disabled={selectedLanguage === 'vi'}
            >
              <Text style={[styles.modalText, selectedLanguage === 'vi' && styles.disabledText]}>Tiếng Việt</Text>
            </TouchableOpacity>
            <Pressable style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>{t('onboarding.close_button')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <AppIntroSlider
        data={onBoardingSlides}
        renderItem={renderItem}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        renderSkipButton={renderSkipButton}
        renderDoneButton={renderDoneButton}
        showSkipButton={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    color: Colors.primary,
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
    marginHorizontal: 10,
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 17,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'montserrat-medium',
    color: '#333',
  },
  finishButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  languageSwitcher: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  languageSwitcherContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    marginRight: 5,
  },
  languageText: {
    fontSize: 16,
    fontFamily: 'montserrat-medium',
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'montserrat-bold',
  },
  modalOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'montserrat-medium',
  },
  modalClose: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'montserrat-medium',
  },
  disabledOption: {
    //ackgroundColor: '#f2f2f2', // Grey background for disabled option
  },
  disabledText: {
    color: '#2596be',
  },
});
