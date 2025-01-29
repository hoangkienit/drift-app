import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../../components/TabBar'

export default function TabLayout() {
  return (
      <Tabs
          tabBar={props => <TabBar {...props} />}
      >
          <Tabs.Screen name='home' options={{
              title: 'Home',
          }} />
          <Tabs.Screen name='order' options={{
              title: 'Order'
          }}/>
          <Tabs.Screen name='profile' options={{
              title: 'Profile'
          }}/>
    </Tabs>
  )
}