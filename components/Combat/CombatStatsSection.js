
// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { styles } from '../../resources/Stylesheet.js'

import Modal from '../Modal.js'
import ArmorCard from './ArmorCard.js'

export default class CombatStatsSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stats: {}
    }
  }

  componentDidMount() {
    this.getStatsFromDb()
  }

  getStatsFromDb() {
    // Load state from DB
    this.props.database.on('value', (snapshotData) => {
      // If it doesn't exist in the DB, skip it
      if (snapshotData.val() === null) {
        return null
      }
      
      this.setState({
        isEdit: false,
        stats: snapshotData.val()
      })
    })
  }

  getRating(stat) {
    return (stat ? stat.rating : 0)
  }

  getEpicModifier(epicRating) {
      if (!epicRating || epicRating == 0) {
          return 0
      }

      return ((0.5 * Math.pow(epicRating, 2)) - (0.5 * epicRating) + 1)
  }

  getActiveWeapon() {
    for (let [ itemIndex, item ] of Object.entries(this.state.stats.weapons)) {
      if (item.isActive) {
        return item
      }
    }

    // Return default
    return {
      defenseValue: 0
    }
  }

  calculateDodgeDv() {    
    const {attribute, ability, legend } = this.state.stats

    return Math.ceil((
      this.getRating(attribute.Dexterity)
       + this.getRating(ability.Athletics)
       + this.getRating(legend)
    )/2) + this.getEpicModifier(attribute.Dexterity.epic)
  }

  calculateParryModifier(abilities) {
    const meleeRating = this.getRating(abilities.Melee)
    const brawlRating = this.getRating(abilities.Brawl)

    return (meleeRating > brawlRating) ? meleeRating : brawlRating
  }

  calculateParryDv() {
    const activeWeapon = this.getActiveWeapon()

    return Math.ceil((
      this.getRating(this.state.stats.attribute.Dexterity)
        + this.calculateParryModifier(this.state.stats.ability)
        + Number(activeWeapon.defenseValue)
    )/2)
  }

  calculateJoinBattle() {
    const dice = (
      this.getRating(this.state.stats.attribute.Wits)
      + this.getRating(this.state.stats.ability.Awareness)
    )

    const autoSuccesses = this.getEpicModifier(this.state.stats.attribute.Wits.epic)
    return dice + 'd + ' + autoSuccesses
  }

  renderAttributes() {
    let attributes = []

    if (this.state.stats.attribute) {
      for (let [ name, stats ] of Object.entries(this.state.stats.attribute)) {
        attributes.push((
          <View key={name} style={styles.statItem}>
            <Text style={styles.statName}>{name}</Text>
            <Text style={styles.statValue}>{stats.rating} ({stats.epic})</Text>
          </View>
        ))
      }
    }

    return attributes
  }

  renderAbilities() {
    let abilities = []

    if (this.state.stats.ability) {
      for (let [ name, stats ] of Object.entries(this.state.stats.ability)) {
        if (stats.rating > 0) {
          abilities.push((
            <View key={name} style={styles.statItem}>
              <Text style={styles.statName}>{name}</Text>
              <Text style={styles.statValue}>{stats.rating}</Text>
            </View>
          ))
        }
      }
    }

    return abilities
  }

  renderCombatStats() {
    // Bashing soak = Stamina + Armor + Epic Stamina Bonus
    // Lethal Soak = ceil(stamina + epic/2) + Armor
    // Aggr soak = armor + epic
    return [
      (
        <View key='dodgeDv' style={styles.statItem}>
          <Text style={styles.statName}>Dodge DV</Text>
          <Text style={styles.statValue}>{this.calculateDodgeDv()}</Text>
        </View>
      ),
      (
        <View key='parryDv' style={styles.statItem}>
          <Text style={styles.statName}>Parry DV</Text>
          <Text style={styles.statValue}>{this.calculateParryDv()}</Text>
        </View>
      ),
      (
        <View key='joinBattle' style={styles.statItem}>
          <Text style={styles.statName}>Join Battle</Text>
          <Text style={styles.statValue}>{this.calculateJoinBattle()}</Text>
        </View>
      )
    ]
  }

  renderSoak() {
    // Bashing soak = Stamina + Armor + Epic Stamina Bonus
    // Lethal Soak = ceil(stamina + epic/2) + Armor
    // Aggr soak = armor + epic
    return [
      (
        <View key='dodgeDv' style={styles.statItem}>
          <Text style={styles.statName}>Dodge DV</Text>
          <Text style={styles.statValue}>{this.calculateDodgeDv()}</Text>
        </View>
      ),
      (
        <View key='parryDv' style={styles.statItem}>
          <Text style={styles.statName}>Parry DV</Text>
          <Text style={styles.statValue}>{this.calculateParryDv()}</Text>
        </View>
      ),
      (
        <View key='joinBattle' style={styles.statItem}>
          <Text style={styles.statName}>Join Battle</Text>
          <Text style={styles.statValue}>{this.calculateJoinBattle()}</Text>
        </View>
      )
    ]
  }

  render() {
    if (!this.state.stats.legend) {
      return null
    }
    // <Text>{JSON.stringify(this.state)}</Text>
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Stats</Text>
        </View>
        <View style={styles.statsSummaryContainer}>
          <View style={styles.statsGroupTitle}>
            <Text>Attributes</Text>
          </View>
          <View style={styles.statsGroup}>
            {this.renderAttributes()}
          </View>

          <View style={styles.statsGroupTitle}>
            <Text>Abilities</Text>
          </View>
          <View style={styles.statsGroup}>
            {this.renderAbilities()}
          </View>

          <View style={styles.statsGroupTitle}>
            <Text>Legend</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statName}>Rating</Text>
            <Text style={styles.statValue}>{this.getRating(this.state.stats.legend)}</Text>
          </View>

          <View style={styles.statsGroupTitle}>
            <Text>Combat</Text>
          </View>
          <View style={styles.statsGroup}>
            {this.renderCombatStats()}
          </View>

          <View style={styles.statsGroupTitle}>
            <Text>Soak</Text>
          </View>
          <View style={styles.statsGroup}>
            {this.renderSoak()}
          </View>
        </View>
      </View>
    )
  }
}
