// @flow

import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class AttributeGroup extends Component {
  static get defaultProps() {
    return {
      title: ''
    };
  }

  render() {
    const buttonColor = this.props.isActive ? 'black' : 'green'
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{this.props.title}</Text>
            {this.props.children}
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: 275
    },
    title: {
        textAlign: 'center'
    }
})