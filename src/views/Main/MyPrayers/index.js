import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity
} from 'react-native'
import PlusIcon from 'react-native-vector-icons/AntDesign'
import HandIcons from 'react-native-vector-icons/FontAwesome5'
import Swipeout from 'react-native-swipeout'

import { colors } from '../../../utils';

export default class MyPrayers extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       prays: [
         {id: 0, 'prayName': 'Pray Item Two week then I will go to club with my friend', 'type': 'love', 'prayTogether': 4, 'prayCount': 3},
         {id: 1, 'prayName': 'Pray Item Three week with my grandmom', 'type': 'love', 'prayTogether': 5, 'prayCount': 10},
         {id: 2, 'prayName': 'Pray Item Four week', 'type': 'inlove', 'prayTogether': 11, 'prayCount': 5},
         {id: 3, 'prayName': 'Pray Item Five week', 'type': 'addict', 'prayTogether': 22, 'prayCount': 7},
       ],
       prayer: null,
       deletedPray: null
    }
  }
  
  // Add Pray Input
  _onRenderAddPrayInput() {
    const { prayer, prays } = this.state
    return (
      <View style={styles.textInputWrapper}>
        <PlusIcon
          name='plus'
          color={colors.bluePrimary}
          size={30}
          onPress={() => {
            const lastId = prays.length - 1

            prays.push({
              id: lastId + 1,
              'prayName' : prayer,
              'type': 'inlove',
              'prayTogether': 0,
              'prayCount': 0
            })
            this.setState({
              prays,
              prayer: null,
            })
            Keyboard.dismiss()
          }}
        />
        <TextInput
          underlineColorAndroid={'transparent'}
          onChangeText={prayer => this.setState({ prayer })}
          placeholderTextColor={colors.grayPrimary}
          placeholder='Add a prayer...'
          value={prayer}
          style={styles.textInput}
        />
      </View>
    )    
  }

  _onRenderTypeColor(type) {
    switch (type) {
      case 'love':
        return colors.redPrimary
      case 'inlove':
        return colors.bluePrimary
      default:
        return colors.goldenPrimary
    }
  }

  _onRenderPrayItem = item => {
    const { prayName, type, prayTogether, prayCount, id } = item.item

    const swipeoutBtns = [
      {
        type: 'delete',
        text: 'Delete',
        color: colors.whitePrimary,
        backgroundColor: colors.redPrimary,
        onPress: () => {
          const itemFilter = this.state.prays.filter(items => items.id !== id)
          this.setState({
            prays: itemFilter,
            deletedPray: this.state.prays[id]
          })
        }
      }
    ]

    return (
      <Swipeout
        right={swipeoutBtns}
        style={{ backgroundColor: 'transparent'}}
      >
        <View style={styles.prayerItemWrapper}>
          <View
            style={[styles.dumbColumn, { backgroundColor: this._onRenderTypeColor(type)}]}
          /> 

          <View style={styles.dumbSquare}/>

          <Text
            lineBreakMode='tail'
            numberOfLines={1}
            style={styles.prayName}
          >{prayName}</Text>

          <View style={styles.countingWrapper}>
            <HandIcons
              name='khanda'
              color={colors.bluePrimary}
              size={18}
            />
            <Text style={styles.counting}>{prayTogether}</Text>
          </View>

          <View style={styles.countingWrapper}>
            <HandIcons
              name='praying-hands'
              color={colors.bluePrimary}
              size={18}
            />
            <Text style={styles.counting}>{prayTogether}</Text>
          </View>
        </View>
      </Swipeout>
    )
  }

  render() {
    const { prays, deletedPray } = this.state
    return (
      <View style={styles.container}>
        {this._onRenderAddPrayInput()}
        <FlatList
          data={prays}
          keyExtractor={item => `list-prayer--${item.id}`}
          renderItem={this._onRenderPrayItem}
          style={{ 
            marginTop: 20,
            marginHorizontal: 20,
          }}
          extraData={this.state}
        />

        {
          deletedPray !== null && (
            <TouchableOpacity
              style={styles.undoWrapper}
              onPress={() => {
                // Push deleted item back to the original arrays
                prays.push(deletedPray)
                // Sorting Array Descending
                prays.sort((a, b) => a.id - b.id)
                this.setState({
                  prays,
                  deletedPray: null
                })
              }}
            >
              <Text style={styles.undo}>Undo</Text>
            </TouchableOpacity>
          )
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  textInputWrapper: {
    borderStyle: 'solid',
    borderColor: colors.grayPrimary,
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginHorizontal: 20,
  },
  textInput: {
    fontSize: 18,
    color: colors.bluePrimary,
    width: '85%'
  },
  prayerItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 20,
    borderStyle: 'solid',
    borderBottomColor: colors.grayPrimary,
    borderBottomWidth: 0.5,
    marginRight: 10
  },
  dumbColumn: {
    width: 3,
    height: '100%',
    marginRight: 15,
    borderRadius: 50
  },
  countingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20
  },
  counting: {
    fontSize: 16,
    marginLeft: 5,
  },
  dumbSquare: {
    width: 25,
    height: 25,
    borderStyle: 'solid',
    borderColor: colors.darkPrimary,
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 15
  },
  prayName: {
    fontSize: 18,
    width: '50%'
  },
  undoWrapper: {
    backgroundColor: colors.bluePrimary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  undo: {
    color: colors.whitePrimary,
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '600'
  }
})