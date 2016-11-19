// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  AsyncStorage,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import AttributeGroup from './AttributeGroup.js'
import AttributeCard from './AttributeCard.js'
import AbilityCard from './AbilityCard.js'
import WillpowerCard from './WillpowerCard.js'


export default class BoonsKnacksPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <View>
        <Text>Boons & Knacks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  titleContainer: {
    backgroundColor: 'aliceblue',
    paddingVertical: 4,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  attributesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  attributeGroup: {
    alignItems: 'center',
    minWidth: 300,
    maxHeight: 260
  },
  abilitiesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  abilityGroup: {
    flexDirection: 'column',
    width: 300,
    alignItems: 'center'
  }
});