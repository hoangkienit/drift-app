import { View, Text } from 'react-native'
import React from 'react'
import { Tabs, useNavigation } from 'expo-router'
import TabBar from '../../components/tabs/TabBar'
import { useTranslation } from 'react-i18next'
import { Colors } from '../../constants/Colors'

export default function TabLayout() {
    const { t } = useTranslation();
  return (
      <Tabs
          tabBar={props => <TabBar {...props} />}
      >
          <Tabs.Screen name='dashboard' options={{
              title: t('tabbar.home'),
              headerShown: false
          }} />
          <Tabs.Screen name='order' options={{
              title: t('tabbar.order'),
              headerShown: false
          }} />
          <Tabs.Screen name='profile' options={{
              title: t('tabbar.profile')
          }}/>
    </Tabs>
  )
}