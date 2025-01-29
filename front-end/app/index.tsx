import { useEffect, useState } from "react";
import { Redirect, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import SplashScreen from "./(routes)/splash";
import i18n from "@/services/translation";

export default function Index() {
  const router = useRouter();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFonts({
    "montserrat": require("./../assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./../assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./../assets/fonts/Montserrat-Bold.ttf"),
  });

  useEffect(() => {
    
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("isFirstLaunch");
        if (firstLaunch === null || firstLaunch === "false") {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("isFirstLaunch", "false");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 5 seconds for splash screen
      }
    };

    const loadLanguage = async () => {
      try {
        // Retrieve the saved language from AsyncStorage
        const storedLanguage = await AsyncStorage.getItem('userLanguage');
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
        } else {
          i18n.changeLanguage('vi'); //Set default language when open the app if user didnt switch language
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        //setIsLoading(false); // Hide the loading spinner
      }
    };

    loadLanguage();

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (!isLoading && isFirstLaunch !== null) {
      if (isFirstLaunch) {
        router.replace("./(routes)/onboarding"); // Navigates to onboarding screen
      } else {
        //router.replace("./(routes)/home"); // Navigates to home screen
      }
    }
  }, [isLoading, isFirstLaunch, router]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
}
