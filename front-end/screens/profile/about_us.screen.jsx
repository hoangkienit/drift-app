import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

const AboutUsScreen = () => {
    const navigation = useNavigation();
    
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Custom Header */}
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={28} color="white" onPress={() => navigation.goBack()} />
                    <Text style={styles.headerText}>About Us</Text>
                </View>

                {/* Logo */}
                <Image source={require('../../assets/images/splash_icon.png')} style={styles.logo} />

                {/* App Information */}
                <Text style={styles.title}>Welcome to Our Food Delivery App!</Text>
                <Text style={styles.description}>
                    We bring delicious meals to your doorstep with just a few taps. Fast delivery, fresh ingredients, and the best restaurants in town.
                </Text>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    <Text style={styles.featureTitle}>Why Choose Us?</Text>
                    <Text style={styles.feature}>✔️ Fast and Reliable Delivery</Text>
                    <Text style={styles.feature}>✔️ Wide Range of Restaurants</Text>
                    <Text style={styles.feature}>✔️ Easy and Secure Payments</Text>
                    <Text style={styles.feature}>✔️ 24/7 Customer Support</Text>
                </View>

                {/* Developer Information */}
                <View style={styles.devContainer}>
                    <Text style={styles.devTitle}>About the Developer</Text>
                    <Text style={styles.devText}>This app is developed and maintained by [Your Name]. I am passionate about building smooth and efficient mobile applications to enhance user experiences.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    featuresContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginBottom: 20,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    feature: {
        fontSize: 16,
        marginBottom: 5,
    },
    devContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#eef2f3',
        borderRadius: 8,
    },
    devTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    devText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default AboutUsScreen;
