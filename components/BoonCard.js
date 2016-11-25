// @flow

import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
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
        <View style={styles.controlContainer}>
          <TouchableOpacity onPress={this.handleDelete.bind(this)}>
            <View style={styles.controlItem}>
              <Text style={[styles.controlText, this.state.isDeleteConfirm ? styles.warningText : {}]}>X</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this.props.onEdit.bind(this)}>
            <View style={styles.controlItem}>
              <Image 
                source={require('../resources/Data-Edit-16.png')}
                style={styles.controlIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
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
