import { Platform, Dimensions } from 'react-native'

// style specifically for iphoneX 
export const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}