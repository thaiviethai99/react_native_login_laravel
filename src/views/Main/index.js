import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'

import Home from './Home';
import ThongBaoCuoc from './ThongBaoCuoc';
const MainNavigation = createStackNavigator({
  home:Home,
  ThongBaoCuoc:ThongBaoCuoc
}, {
  initialRouteName: 'home',
  headerMode: 'none'
})

export default createAppContainer(MainNavigation)