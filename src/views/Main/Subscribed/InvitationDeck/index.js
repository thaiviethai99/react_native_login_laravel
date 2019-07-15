import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'
import { colors } from '../../../../utils';

const screenWidth = Dimensions.get('window').width
const SWIPE_THRESHOLD = screenWidth * 0.25
const SWIPE_OUT_DURATION = 250

export default class componentName extends Component {

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()
    
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this._onForceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this._onForceSwipe('left')
        } else {
          this._onResetPosition()
        }
      }
    })

    this.state = {
       panResponder,
       position,
       index: 0
    }
  }

  _onForceSwipe(direction) {
    const x = direction === 'right' ? screenWidth: -screenWidth
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this._onSwipeComplete(direction))
  }

  _onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props
    const item = data[this.state.index]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)

    this.state.position.setValue({ x: 0, y: 0 })
    this.setState({ index: this.state.index + 1 })
  }


  _onResetPosition() {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start()
  }

  _onGetCardStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [
        -screenWidth * 1.5,
        0,
        screenWidth * 1.5,
      ],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  _onRenderCardItem(item) {
    const {
      invitator,
      description
    } = item
    return (
      <View>

        {/* Invitator's info */}
        <View style={styles.userWrapper}>
          <Image
            source={{ uri: invitator.avatar }}
            style={styles.avatar}
            resizeMode={'contain'}
          />
          <Text style={styles.invitatorName}>{invitator.name}'s invited to her Prayer</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        {/* Invitator's action */}
        <View style={styles.actionWrapper}>
          {/* Accept */}
          <TouchableOpacity
            style={styles.acceptBtn}
          >
            <Text style={styles.accept}>Accept</Text>
          </TouchableOpacity>
          {/* PostPone */}
          <TouchableOpacity
            style={styles.actionBtn}
          >
            <Text style={styles.actionTxt}>Postpone</Text>
          </TouchableOpacity>
          {/* No Thanks */}
          <TouchableOpacity
            style={styles.actionBtn}
          >
            <Text style={styles.actionTxt}>No, Thanks</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  _onRenderCards() {
    const { data } = this.props

    if (data && data !== null) {
      return data.map((item, index) => {
        if (index < this.state.index) { return null }
        
        if (index === this.state.index) {
          return (
            <Animated.View
              key={index}
              style={[styles.invitatorWrapper, this._onGetCardStyle()]}
              {...this.state.panResponder.panHandlers}
            >
              {this._onRenderCardItem(item)}
            </Animated.View>
          )
        }

        return (
          <Animated.View
            key={index}
            style={styles.cardStyle}
          >
            {this._onRenderCardItem(item)}
          </Animated.View>
        )
      }).reverse()
    }
  }

  render() {
    return (
      <View>
        {this._onRenderCards()}
      </View>
    )
  }
}

const styles= StyleSheet.create({
  invitatorWrapper: {
    backgroundColor: colors.goldenPrimary,
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  cardStyle: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    top: 15,
    left: 10,
    right: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(191, 179, 147, 0.07)'
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 3
  },
  invitatorName: {
    color: colors.whitePrimary,
    fontWeight: '600',
    fontSize: 17,
    marginLeft: 10,
    width: '75%'
  },
  actionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  acceptBtn: {
    backgroundColor: colors.whitePrimary,
    width: '30%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accept: {
    color: colors.goldenPrimary,
    fontWeight: '600'
  },
  actionBtn: {
    width: '30%',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.whitePrimary,
  },
  actionTxt: {
    color: colors.whitePrimary,
    fontWeight: '600'
  },
  description: {
    color: colors.whitePrimary,
    marginTop: 10,
    fontSize: 15,
    lineHeight: 20
  }
})
