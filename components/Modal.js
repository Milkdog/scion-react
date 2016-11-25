// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'

import { styles } from '../resources/Stylesheet.js'

export default class Modal extends Component {
  render() {
    if (!this.props.isVisible)
      return null

    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalBackground} />
        <View style={styles.modal}>
          <Text style={styles.title}>{this.props.title}</Text>
          
          {this.props.children}

          <TouchableOpacity
            style={styles.button}
            onPress={this.props.onCancel}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
