// @flow

import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import Box from './Box.js'

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
          specialty: this.props.specialty,
          isShowSpecialty: false,
          specialtyName: '',
          isFavored: false
      }
  }

  componentDidMount() {
      this.getFromDb()
  }

  getFromDb() {
      // Load state from DB
      this.props.database.child(this.getStoragePath()).child(this.props.title).on('value', (snapshotData) => {
          if (snapshotData.val() !== null) {
              this.setState(snapshotData.val())
          }
      })
  }

  saveData(data) {
      this.setState(data, () => {
          this.props.database.child(this.getStoragePath()).child(this.props.title).set(this.state)
      })
  }

  getStoragePath() {
      return 'ability'
  }

  onPressIncrement(isBoxActive, updateType) {
      // On first click, get the specialty name
      if (this.props.specialty && this.state[updateType] === 0) {
          this.setState({
              isShowSpecialty: true
          })
          return false
      }

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

  handleAddSpecialty(name) {
      this.setState({
          isShowSpecialty: false,
      }, () => {
          const dbPath = this.props.title + ' (' + name + ')'
          this.props.database.child(this.getStoragePath()).child(dbPath).set({
              isFavored: this.state.isFavored,
              rating: 1
          })
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
  
  renderAbilityContent() {
    if (this.state.isShowSpecialty) {
        return (
            <TextInput
                placeholder='Specialty Type'
                onSubmitEditing={(event) => {this.handleAddSpecialty(event.nativeEvent.text)}}
            />
        )
    }

    return (
        <View style={styles.ratingContainer}>
            {this.renderRatingBoxes()}
        </View>
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
            {this.renderAbilityContent()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        width: 280
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    title: {
        fontWeight: 'bold'
    }
})