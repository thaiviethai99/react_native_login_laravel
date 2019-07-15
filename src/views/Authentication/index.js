import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

import LoginScreen from './Login'

const AuthNavigation = createStackNavigator({
  Login: LoginScreen,
 // Register: RegisterScreen,
 // Reset: ResetScreen,
}, {
  initialRouteName: 'Login',
  headerMode: 'none'
})

export default createAppContainer(AuthNavigation)