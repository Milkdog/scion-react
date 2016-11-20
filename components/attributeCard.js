// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Box from './Box.js'

const storagePrefix = '@Attribute:'

export default class AttributeCard extends Component {
  static get defaultProps() {
    return {
      title: 'Attribute'
    };
  }

  constructor(props) {
      super(props)

      this.state = {
          rating: 1,
          epic: 0
      }
  }

  componentDidMount() {
      const data = this.props.database.child('attribute/' + this.props.title + '/')
      console.log(data)
  }

  saveData(data) {
      this.setState(data, () => {
          const savePath = 'attribute/' + this.props.title + '/'
          this.props.doSave(savePath, this.state)
            AsyncStorage.setItem(storagePrefix + this.props.title, JSON.stringify(this.state))
      })
  }

  onPress(isBoxActive, updateType) {
      const change = isBoxActive ? -1 : 1
      const update = {}
      update[updateType] = this.state[updateType] + change
      this.saveData(update)
  }

  renderRatingBoxes() {
    const ratingBoxes = []
    
    for (let i=0; i < 10; i++) {
        const isActive = (i < this.state.rating)
        ratingBoxes.push(
            <Box key={i} isActive={isActive} isRounded={true} onPress={() => { this.onPress(isActive, 'rating')}} />
        )
    }

    return ratingBoxes
  }

  renderEpicgBoxes() {
    const epicBoxes = []
    
    for (let i=0; i < 10; i++) {
        const isActive = (i < this.state.epic)
        epicBoxes.push(
            <Box key={i} isActive={isActive} onPress={() => { this.onPress(isActive, 'epic')}} />
        )
    }

    return epicBoxes
  }

  calculateAutoSuccess() {
      const {epic} = this.state

      if (epic == 0) {
          return 0
      }

      return ((0.5 * Math.pow(epic, 2)) - (0.5 * epic) + 1)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={{flex: .5}}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View style={{flex: .5}}>
                <Text style={styles.subhead}>Dice: {this.state.rating}d + {this.calculateAutoSuccess()}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
           {this.renderRatingBoxes()}
        </View>
        <View style={{flexDirection: 'row', marginTop: 4}}>
           {this.renderEpicgBoxes()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 4
    },
    title: {
        fontWeight: 'bold'
    },
    subhead: {
        textAlign: 'right'
    }
})