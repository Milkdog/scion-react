// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import { styles } from '../resources/Stylesheet.js'

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

  handleAddBoon() {
    
  }

  render() {
    return (
      <View style={styles.boonsKnacksContainer}>
        <View style={styles.splitContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Boons</Text>
            <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleAddBoon.bind(this)}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.splitContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Knacks</Text>
          </View>
        </View>
      </View>
    );
  }
}
