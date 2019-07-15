import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import faker from 'faker'
import { colors } from '../../../utils';
import InvitationDeck from './InvitationDeck/'

const Invitations = (() => {
  return [...new Array(10)].map(() => ({
    invitator: {
      avatar: faker.internet.avatar(),
      name: faker.internet.userName()
    },
    description: faker.lorem.sentence(15)
  }))
})()

export default class Subscribed extends Component {

  render() {

    console.log('CHECK FAKER DATA', Invitations)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Invitation
        </Text>
        <InvitationDeck
            data={Invitations}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    color: colors.bluePrimary,
    textTransform: 'uppercase',
    marginBottom: 10,
  }
})