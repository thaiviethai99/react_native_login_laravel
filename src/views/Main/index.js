import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

import Home from './Home';
const MainNavigation = createStackNavigator({
  home:Home
}, {
  initialRouteName: 'home',
  headerMode: 'none'
})

export default createAppContainer(MainNavigation)