// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BirthrightCard extends Component {
  static get defaultProps() {
    return {
      title: 'Ability',
      showEmpty: true
    };
  }

  constructor(props) {
      super(props)
  } 

  render() {        
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
            {this.props.name}
        </Text>
        <View>
            <Text>Rating: {this.props.rating}</Text>
        </View>
        <View>
            <Text>Purviews: {this.props.purviews}</Text>
        </View>
        <View style={styles.effectsBox}>
            <Text>{this.props.effects}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      margin: 8,
      padding: 8,
      width: 280,
      borderWidth: 2,
      borderColor: 'lightblue',
      borderRadius: 4
    },
    title: {
        fontWeight: 'bold'
    },
    effectsBox: {
      borderTopWidth: 1,
      marginTop: 4,
      paddingTop: 4
    }
})