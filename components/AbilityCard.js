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
          rating: 0
      }
  }

  componentDidMount() {
      // Get the state from storage
      const storedState = AsyncStorage.getItem(storagePrefix + this.props.title, (error, result) => {
          if (result !== null) {
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
    
    for (let i=0; i < 5; i++) {
        const isActive = (i < this.state.rating)
        ratingBoxes.push(
            <Box key={i} isActive={isActive} isRounded={true} onPress={() => { this.onPress(isActive, 'rating')}} />
        )
    }

    return ratingBoxes
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: .5}}>
            <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={{flex: .5}}>
            <View style={styles.ratingContainer}>
                {this.renderRatingBoxes()}
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        height: 24,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 300
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold'
    }
})