import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import DrawerNavigator from '../Navigators/DrawerNavigator'

const Main = (): React.JSX.Element => {
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
      <DrawerNavigator/>
    </ScrollView>    
  )
}

export default Main