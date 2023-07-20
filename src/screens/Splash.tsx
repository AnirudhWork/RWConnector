import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'

type HomeProp = NativeStackScreenProps <RootStackParamList, 'Splash'>;

const Splash = ({navigation}: HomeProp) => {

  setTimeout(() => {
    navigation.replace('Login');
  }, 2500);

    const logo = require('../Icons/RWLogo.png')
  return (
    <View style={styles.container}>
        <Image source={logo}></Image>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#000'
    },
});