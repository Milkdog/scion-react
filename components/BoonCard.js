// @flow

import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../resources/Stylesheet.js'

export default class BoonCard extends Component {
  static get defaultProps() {
    return {
      title: 'Boon'
    }
  }

  constructor(props) {
      super(props)

      this.state = {
        isDeleteConfirm: false
      }
  } 

  handleDelete() {
    // On first press
    if (!this.state.isDeleteConfirm) {
      this.setState({
        isDeleteConfirm: true
      })
    } else {
      // On next press
      this.props.onDelete()
    }
  }

  render() {        
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={this.handleDelete.bind(this)}>
          <Text style={this.state.isDeleteConfirm ? styles.warningText : {}}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
            {this.props.name}
        </Text>
        <View>
            <Text>Rating: {this.props.rating}</Text>
        </View>
        <View>
            <Text>Purview: {this.props.purview}</Text>
        </View>
        <View>
            <Text>Dice: {this.props.dicePool}</Text>
        </View>
        <View style={styles.descriptionContainer}>
            <Text>{this.props.description}</Text>
        </View>
      </View>
    )
  }
}
