import { View, Text, Image, StyleSheet } from "react-native";
import React from 'react'
import * as Animatable from "react-native-animatable";
import { Colors } from "@/constants/Colors";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Icon with Animation */}
      <Animatable.View animation="fadeIn" duration={2000}>
        <Image
          source={require("../../assets/images/splash_icon.png")}
          style={styles.icon}
        />
      </Animatable.View>

      {/* App Name with Animation */}
      <Animatable.View animation="fadeIn" delay={400} duration={2000}>
        <Text style={styles.appName}>Drift</Text>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color
  },
  icon: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  appName: {
    fontSize: 60, // Size of the app name
    fontFamily: "montserrat-bold", // Use your custom font if needed
    color: Colors.primary,
  },
});


