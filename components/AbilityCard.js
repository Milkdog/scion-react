// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Box from './Box.js'

const storagePrefix = '@Abilities:'

export default class AbilitiesCard extends Component {
  static get defaultProps() {
    return {
      title: 'Ability',
      showEmpty: true
    };
  }

  constructor(props) {
      super(props)

      this.state = {
          rating: 0,
          isFavored: false
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

  onPressIncrement(isBoxActive, updateType) {
      const change = isBoxActive ? -1 : 1
      const update = {}
      update[updateType] = this.state[updateType] + change
      this.saveData(update)
  }

  handleToggleFavored() {
      this.saveData({
          isFavored: !this.state.isFavored
      })
  }

  renderRatingBoxes() {
    const ratingBoxes = []
    
    for (let i=0; i < 5; i++) {
        const isActive = (i < this.state.rating)
        ratingBoxes.push(
            <Box key={i} isActive={isActive} isRounded={true} onPress={() => { this.onPressIncrement(isActive, 'rating')}} />
        )
    }

    return ratingBoxes
  }

  renderFavoredBox() {
    return (
      <Box isActive={this.state.isFavored} onPress={this.handleToggleFavored.bind(this)} />
    )
  }
  

  render() {
    if (!this.props.showEmpty && this.state.rating == 0)
        return null
        
    return (
      <View style={styles.container}>
        <View style={{flex: .1}}>
            {this.renderFavoredBox()}
        </View>
        <View style={{flex: .4}}>
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
        flexDirection: 'row',
        justifyContent: 'center',
        width: 300
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold'
    }
})