// @flow

import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput
} from 'react-native';
import Box from './Box.js'
import { styles } from '../resources/Stylesheet.js'

export default class ExperienceCard extends Component {
  static get defaultProps() {
    return {
      title: 'Experience',
      isLoaded: false
    };
  }

  constructor(props) {
    super(props)

    this.state = {
      total: '0',
      spent: '0'
    }
  }

  componentDidMount() {
    // Load state from DB
    this.props.database.child(this.getStoragePath()).on('value', (snapshotData) => {
      if (snapshotData.val()) {
        this.setState(snapshotData.val())
        this.setState({
          isLoaded: true
        })
      }
    })  
  }

  saveData(data) {
    if(this.state.isLoaded) {
      this.setState(data, () => {
        this.props.database.child(this.getStoragePath()).set(this.state)
      })
    }
  }

  getStoragePath() {
   return 'experience'
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.experienceContainer}>
          <View style={styles.inputRow}>
            <Text>Total: </Text>
            <TextInput 
              value={this.state.total}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({total: text})}
              style={styles.cardInput}
            />

            <Text>Spent: </Text>
            <TextInput 
              value={this.state.spent}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({spent: text})}
              style={styles.cardInput}
            />
          </View>

          <View style={styles.inputRow}>
            <Text>Remaining: </Text>
            <Text>{this.state.total - this.state.spent}</Text>
          </View>
        </View>
      </View>
    )
  }
}
