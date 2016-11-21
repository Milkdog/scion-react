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

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 12,
    textAlign: 'center'
  },
  button: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#CCCCCC',
    width: 200,
    alignSelf: 'flex-end'
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    //backgroundColor: 'black',
    opacity: .5
  },
  modal: {
    top: 100,
    width: 500,
    padding: 20,
    backgroundColor: 'aliceblue',
    borderWidth: 2,
    borderRadius: 10,
  }
});