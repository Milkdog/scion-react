// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import { styles } from '../../resources/Stylesheet.js'

const diceMinimum = 1
const diceMaximum = 10
const minimumSuccessCount = 7
const botch = 1
const doubleCount = 10

export default class DiceModal extends Component {
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
      return 'BOTCH!!'
    } else {
      return 'No successes. No botch.'
    }
  }

  rollDie() {
    return Math.floor(Math.random() * (diceMaximum - diceMinimum + 1)) + diceMinimum;
  }

  renderResults() {
    const rawSuccesses = this.getRawSuccesses(this.props.dice)

    if (typeof rawSuccesses === 'string') {
      return <Text>{rawSuccesses}</Text>
    } else {
      const calculatedSuccesses = rawSuccesses + this.props.autoSuccess
      return (
        <View>
          <Text>Successes: {calculatedSuccesses}</Text>
          <Text>Rolled {this.props.dice}d10</Text>
          <Text>Dice Successes: {rawSuccesses}</Text>
          <Text>Auto Successes: {this.props.autoSuccess}</Text>
        </View>
      )
    }
  }

  render() {
    if (!this.props.isVisible)
      return null
    
    

    return (
      <View style={styles.diceModalContainer}>

          <Text style={styles.title}>Roll Dice</Text>
          {this.renderResults()}
      </View>
    )
  }
}
