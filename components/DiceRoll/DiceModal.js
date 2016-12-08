// @flow

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import { styles } from '../../resources/Stylesheet.js'

const diceMinimum = 1
const diceMaximum = 10
const minimumSuccessCount = 7
const botch = 1
const doubleCount = 10

export default class DiceModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRolling: true,
      dice: 0,
      autoSuccess: 0,
      rawBonus: 0
    }
  }

  componentDidMount() {
    this.getItemsFromDb()
  }

  getItemsFromDb() {
    // Load state from DB
    this.props.database.child(this.getStoragePath()).on('value', (snapshotData) => {
      if (snapshotData.val() !== null) {
        let dice = 0
        let autoSuccess = 0
        let rawBonus = 0
        
        for (const [ name, stats ] of Object.entries(snapshotData.val())) {
          dice += stats.rating ? stats.rating : 0
          autoSuccess += this.getEpicModifier(stats.epic)
          rawBonus += stats.rawBonus ? stats.rawBonus : 0
        }

        this.setState({
          dice,
          autoSuccess,
          rawBonus
        })
      }
    })
  }

  componentWillUnmount() {
    this.props.database.child(this.getStoragePath()).off('value')
  }

  getStoragePath() {
      return 'selectedStats'
  }

  handleClearSelectedStats() {
    this.props.database.child(this.getStoragePath()).remove()
    this.setState({
      dice: 0,
      autoSuccess: 0,
      rawBonus: 0
    })
  }

  getEpicModifier(epicRating) {
    if (!epicRating || epicRating == 0) {
      return 0
    }

    return Number((0.5 * Math.pow(epicRating, 2)) - (0.5 * epicRating) + 1)
  }

  getRawSuccesses(numberDice) {
    let successes = 0
    let botches = 0

    for (let i = 0; i < numberDice; i++) {
      const result = this.rollDie()

      if (result == doubleCount) {
        successes += 2
      } else if (result >= minimumSuccessCount) {
        successes++
      } else if (result == botch) {
        botches++
      }
    }

    if (successes > 0) {
      return successes
    } else if (botches > 0) {
      return -1
    } else {
      return 0
    }
  }

  rollDie() {
    return Math.floor(Math.random() * (diceMaximum - diceMinimum + 1)) + diceMinimum;
  }

  renderResults() {
    const rawSuccesses = this.getRawSuccesses(this.state.dice)

    if (rawSuccesses < 0) {
      // Botch
      return <Image source={require('../../resources/botch.jpg')} style={{height: 180, width: 180}} />
    } else {
      const calculatedSuccesses = rawSuccesses + this.state.autoSuccess + this.state.rawBonus
      return (
        <View>
          <Text style={styles.diceSuccesses}>{calculatedSuccesses}</Text>
          <Text style={styles.diceModalLabel}>Successes</Text>
          <Text>Rolled {this.state.dice}d10</Text>
          <Text>Dice Successes: {rawSuccesses}</Text>
          <Text>Auto Successes: {this.state.autoSuccess}</Text>
        </View>
      )
    }
  }

  render() {
    if (!this.props.isVisible)
      return null

    return (
      <View style={styles.diceModalContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.diceModalTitle}>Roll Dice</Text>
        </View>
        {this.renderResults()}
        <TouchableOpacity style={[styles.button, styles.diceModalButton]} onPress={this.handleClearSelectedStats.bind(this)}>
          <Text>Clear Dice</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
