import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import firebase from 'react-native-firebase'
import BuddhismIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input, Modal, Wrapper, Button } from '../../../components/index'
import { colors } from '../../../utils/index'

const auth = firebase.auth()

export default class Register extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email: null,
       password: null,
       isRegistering: false,
       registerError: null,
       sentConfirmEmail: false,
       isShowModal: false
    }
  }
  
  _onToggleModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal })
  }

  _onRegisterUser = async () => {
    const { email, password } = this.state
    try {
        this.setState({ isRegistering: true })
        await auth.createUserWithEmailAndPassword(email, password)
        await auth.currentUser.sendEmailVerification()

        this.setState({
          isRegistering: false,
          sentConfirmEmail: true
        })
        this._onToggleModal()
    } catch (error) {
      console.log('Register user error', error)
      this.setState({
        registerError: error,
        isRegistering: false
      })
      this._onToggleModal()
    }
  }

  _onRenderModalMessage = () => {
    const { registerError, sentConfirmEmail } = this.state
    if (registerError !== null && registerError.code === 'auth/invalid-email') {
      return 'Email should follow format example@example.com. Please try again!'
    }

    if (sentConfirmEmail) {
      return `We've just sent you a confirmation email, please check your email to verify`
    }
  }

  _onRenderModal = () => {
    const { isShowModal } = this.state
    return (
      <Modal
        isVisible={isShowModal}
        message={this._onRenderModalMessage()}
        onPress={() => this._onToggleModal()}
      />
    )
  }


  _onRenderInputFiled() {
    return (
      <View style={styles.textInputWrapper}>
        {/* Email */}
        <Input
          placeholder='Email'
          placeholderTextColor={colors.whiteTransPrimary}
          onChange={email => this.setState({ email })}
        />
        {/* Password */}
        <Input
          placeholder='Password'
          placeholderTextColor={colors.whiteTransPrimary}
          onChange={password => this.setState({ password })}
          secureTextEntry
          customStyle={styles.input}
        />
        {/* Button */}
        <Button
         onPress={() => this._onRegisterUser()}
         btnStyle={styles.input}
        >
          Register
        </Button>
      </View>
    )
  }

  render() {
    const { isRegistering } = this.state
    console.log('IS REGISTEING', isRegistering)
    return (
     <Wrapper
      isLoading={isRegistering}
      customStyle={styles.container}
     >
       <Text style={styles.title}>Become a Buddhist</Text>

       <BuddhismIcon
          name={'buddhism'}
          color={colors.whitePrimary}
          size={100}
       />

       {this._onRenderInputFiled()}
       {this._onRenderModal()}
     </Wrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: colors.darkBluePrimary
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: colors.whitePrimary,
    letterSpacing: 3,
    marginBottom: 20
  },
  textInputWrapper: {
    width: '85%',
    marginTop: 50
  },
  input: {
    marginTop: 30
  }
})