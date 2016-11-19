// @flow

import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class TabBar extends Component {
  render() {
    return (
      <View style={styles.tabContainer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    tabContainer: {
        position: 'absolute',
        bottom:0,
        right:0,
        left:0,
        height:50,
        opacity:1,
        backgroundColor: '#343434',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})