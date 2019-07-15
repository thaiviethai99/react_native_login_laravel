import {
    createSwitchNavigator,
    createAppContainer
  } from 'react-navigation'
  
  // AuthLoading
  import AuthLoadingScreen from '../views/AuthLoading'
  // AuthStack
  import AuthStack from '../views/Authentication'
  // MainStack
  import MainStack from '../views/Main'
  
  const AppNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Main: MainStack
  }, {
    initialRouteName: 'AuthLoading',
  })
  
  export default createAppContainer(AppNavigation)