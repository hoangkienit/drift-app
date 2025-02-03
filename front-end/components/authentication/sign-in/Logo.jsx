import React from 'react';
import { Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Logo = () => (
  <Image
    source={require('../../../assets/images/splash_icon.png')} 
    style={{
      width: width * 0.8,
      height: height * 0.2,
      marginBottom: 30,
    }}
    resizeMode="contain"
  />
);

export default Logo;
