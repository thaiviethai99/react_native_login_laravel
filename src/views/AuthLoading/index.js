import React, { Component } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { storageKey } from '../../utils'

export default class AuthLoading extends Component {
  

  async componentDidMount() {
    const { navigation } = this.props

    // Get token from storage
    const tokenStorage = await AsyncStorage.getItem(storageKey.token)

    // Check token in storage
    if (tokenStorage && tokenStorage !== null) {
      // if exist ---> Main
      navigation.navigate('Main')
    } else {
      // else (no exist) ---> Auth
      navigation.navigate('Auth')
    }
  };
  

  render() {
    return (
      <View>
        <Text>
          AuthLoading
        </Text>
      </View>
    )
  }
}