// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Box from './box.js'

const storagePrefix = '@Abilities:'

export default class AbilitiesCard extends Component {
  static get defaultProps() {
    return {
      title: 'Ability'
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
      // Get the state from storage
      const storedState = AsyncStorage.getItem(storagePrefix + this.props.title, (error, result) => {
          if (result !== null) {
              console.log(this.props.title, result)
              this.setState(JSON.parse(result))
          }
      })
  }

  saveData(data) {
      this.setState(data, () => {
        AsyncStorage.setItem(storagePrefix + this.props.title, JSON.stringify(this.state), (error) => {
            console.log('error', error)
        })
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
        <View style={[{flexDirection: 'row'}, styles.headerContainer]}>
            <View style={{flex: .5}}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View style={{flex: .5}}>
                <Text style={styles.subhead}>Auto: {this.calculateAutoSuccess()}</Text>
            </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
           {this.renderRatingBoxes()}
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 4}}>
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
        marginBottom: 4
    },
    title: {
        fontWeight: 'bold'
    },
    subhead: {
        textAlign: 'right'
    }
})