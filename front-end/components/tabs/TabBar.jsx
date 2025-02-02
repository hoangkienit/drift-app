import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Colors } from "../../constants/Colors"

import TabBarButton from './TabBarButton';

const TabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

          if (['_sitemap', '+not-found'].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
          };
          return (
              <TabBarButton
                key={route.name}
                style={styles.tabbarItem}
                onPress={onPress}
                  onLongPress={onLongPress}
                  isFocused={isFocused}
                  routeName={route.name}
                  label={label}
                  color={isFocused ? Colors.primary : '#666'}
              />
          )

      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff',
        //marginHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 15,
        borderRadius: 22,
        borderCurve: 'continuous',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.3
    }
    
});

export default TabBar