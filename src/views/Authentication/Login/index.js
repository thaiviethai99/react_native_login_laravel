import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Alert, Button, Text,Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { colors, storageKey } from '../../../utils';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      UserEmail: '',
      UserPassword: '',
      bug: ''
    }
  }

  UserLoginFunction = () => {

    const { UserEmail } = this.state;
    const { UserPassword } = this.state;

    fetch('http://10.0.186.214/selfcare/client/get-login-mobile', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: UserEmail,
        password: UserPassword
      })
    }).then((response) => response.json())
      .then((responseJson) => {
       console.log('then');
       alert(responseJson.result);
      }).catch((error) => {
        console.log('loi');
        console.log(error.message);
      });


  }

  render() {
    return (

      <View style={styles.MainContainer}>

        <Text style={styles.TextComponentStyle}>User Login Form</Text>

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Email"

          onChangeText={UserEmail => this.setState({ UserEmail })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}
        />

        <TextInput

          // Adding hint in Text Input using Place holder.
          placeholder="Enter User Password"

          onChangeText={UserPassword => this.setState({ UserPassword })}

          // Making the Under line Transparent.
          underlineColorAndroid='transparent'

          style={styles.TextInputStyleClass}

          secureTextEntry={true}
        />

        <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />

        <Text></Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,

  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: 'center',
    marginBottom: 15
  }
});