// @flow

import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Box extends Component {
  static get defaultProps() {
    return {
      isActive: true,
      isRounded: false
    };
  }

  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}>
            <View style={[
                styles.box,
                this.props.isActive ? styles.active : styles.inactive,
                this.props.isRounded ? styles.rounded : null
            ]}>
                <Text>{this.props.isActive}</Text>
            </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        height: 20,
        width: 20,
        marginHorizontal: 4
    },
    rounded: {
        borderRadius: 10
    },
    active: {
        backgroundColor: 'black'
    },
    inactive: {
        backgroundColor: 'white'
    }
})