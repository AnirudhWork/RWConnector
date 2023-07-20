import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SplashProp } from './types';


const Splash = ({navigation}: SplashProp): React.JSX.Element => {

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