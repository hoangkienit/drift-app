import { Switch } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function CustomSwitch({ value, onToggle }) {
  return (
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: "#ccc", true: Colors.primary }} // OFF: gray, ON: green
      thumbColor={value ? "#ffffff" : "#f4f4f4"} // White thumb
    />
  )
}