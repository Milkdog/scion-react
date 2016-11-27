// @flow

const resourcesRoot = '../../resources/'

import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native'
import { styles } from '../../resources/Stylesheet.js'

export default class WeaponCard extends Component {
  static get defaultProps() {
    return {
      title: 'Weapon'
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
                source={require('../../resources/Data-Edit-16.png')}
                style={styles.controlIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.doActivate.bind(this)}>
          <Text style={[styles.cardTitle, this.props.isActive ? styles.goodText : styles.normalText]}>
              {this.props.name}
          </Text>
        </TouchableOpacity>
        <View>
            <Text>Accuracy Modifier: +{this.props.accuracyModifier}</Text>
        </View>
        <View>
            <Text>Damage Modifier: +{this.props.damageModifier}</Text>
        </View>
        <View>
            <Text>Speed: {this.props.speed}</Text>
        </View>
        <View>
            <Text>Defense Value: {this.props.defenseValue}</Text>
        </View>
        <View>
            <Text>Range: {this.props.range}</Text>
        </View>
        
        <View style={styles.descriptionContainer}>
            <Text>{this.props.description}</Text>
        </View>
      </View>
    )
  }
}
