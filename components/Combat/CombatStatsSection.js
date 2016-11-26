
// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { styles } from '../../resources/Stylesheet.js'

import Modal from '../Modal.js'
import ArmorCard from './ArmorCard.js'

export default class ArmorSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }


  render() {
    return (
      <View style={styles.splitContainer}>
        {this.renderModal()}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Stats</Text>
        </View>
      </View>
    )
  }
}
