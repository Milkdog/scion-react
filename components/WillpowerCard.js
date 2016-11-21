// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Box from './Box.js'

const storagePrefix = '@Willpower:'

export default class WillpowerCard extends Component {
  static get defaultProps() {
    return {
      title: 'Willpower'
    };
  }

  constructor(props) {
      super(props)

      this.state = {
          rating: 0,
          tempRating: 0
      }
  }

  componentDidMount() {
      // Load state from DB
      this.props.database.child(this.getStoragePath()).on('child_added', (snapshotData) => {
          const value = {}
          value[snapshotData.key] = snapshotData.val()

          this.setState(value)
      })
      
  }

  saveData(data) {
      this.setState(data, () => {
          this.props.database.child(this.getStoragePath()).set(this.state)
      })
  }

  getStoragePath() {
      return 'willpower'
  }

  onPressIncrement(isBoxActive, updateType) {
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
            <Box key={i} isActive={isActive} isRounded={true} onPress={() => { this.onPressIncrement(isActive, 'rating')}} />
        )
    }

    return ratingBoxes
  }

  renderTempRatingBoxes() {
    const ratingBoxes = []
    
    for (let i=0; i < 10; i++) {
        const isActive = (i < this.state.tempRating)
        ratingBoxes.push(
            <Box key={i} isActive={isActive} onPress={() => { this.onPressIncrement(isActive, 'tempRating')}} />
        )
    }

    return ratingBoxes
  }
  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
           {this.renderRatingBoxes()}
        </View>
        <View style={{flexDirection: 'row', marginTop: 4}}>
           {this.renderTempRatingBoxes()}
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