import { StyleSheet } from 'react-native'
import { colors } from '../../../utils';
import { isIphoneX } from '../../../utils/layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginLeft: 10
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  dumbAvatar: {
    width: 70,
    height: 70,
    backgroundColor: colors.redPrimary,
    borderRadius: 35
  },
  settingIcon: {
    backgroundColor: colors.bluePrimary,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: -15,
    top: -10,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  prayingWrapper: {

  },
  prayerCount: {
    textTransform: 'uppercase',
    fontSize: 13,
    letterSpacing: 0.5,
    marginTop: 10
  },
  prayerNum: {
    color: colors.goldenPrimary,
    fontSize: 20,
    fontWeight: '500'
  },
  prayActivityWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  dumbActivity: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bluePrimary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderStyle: 'solid',
    height: 45,
    marginTop: 30
  },
  tab: {
    width: '50%',
    borderStyle: 'solid',
    flex: 1
  },
  tabTxt: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 0.5
  }
})

export default styles