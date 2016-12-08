
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
import StatCard from './StatCard.js'

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

  componentWillUnmount() {
    this.props.database.off('value')
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
    return Number(stat ? stat.rating : 0)
  }

  getEpicModifier(epicRating) {
      if (!epicRating || epicRating == 0) {
          return 0
      }

      return Number((0.5 * Math.pow(epicRating, 2)) - (0.5 * epicRating) + 1)
  }

  getActiveWeapon() {
    if (this.state.stats.weapons && this.state.stats.weapons.length > 0) {
      for (let [ itemIndex, item ] of Object.entries(this.state.stats.weapons)) {
        if (item.isActive) {
          return item
        }
      }
    }

    // Return default
    return {
      damageModifier: 0,
      damageType: '',
      defenseValue: 0
    }
  }

  getActiveArmor() {
    if (this.state.stats.armor && this.state.stats.armor.length > 0) {
      for (let [ itemIndex, item ] of Object.entries(this.state.stats.armor)) {
        if (item.isActive) {
          return item
        }
      }
    }

    // Return default
    return {
      bashSoak: 0,
      lethalSoak: 0,
      mabilityPenalty: 0
    }
  }

  calculateAccuracy(type) {
    const activeWeapon = this.getActiveWeapon()

    return (
      this.getRating(this.state.stats.attribute.Dexterity)
        + this.getRating(this.state.stats.ability[type])
        + Number(activeWeapon.accuracyModifier ? activeWeapon.accuracyModifier : 0)
    ) 
  }

  calculateDamage() {
    const activeWeapon = this.getActiveWeapon()

    return {
      dice: Number(activeWeapon.damageModifier ? activeWeapon.damageModifier : 0),
      modifier: activeWeapon.damageType.charAt(0)
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
    return {
      dice: dice,
      rawBonus: autoSuccesses
    }
  }

  calculateStaminaSoak() {
    return (
      this.getRating(this.state.stats.attribute.Stamina)
        + this.getEpicModifier(this.state.stats.attribute.Stamina.epic)
    )
  }

  calculateBashSoak() {
    const activeArmor = this.getActiveArmor()

    return (
      this.calculateStaminaSoak()
        + Number(activeArmor.bashSoak)
    )
  }

  calculateLethalSoak() {
    const activeArmor = this.getActiveArmor()

    return (
      Math.ceil(this.calculateStaminaSoak()/2)
        + Number(activeArmor.lethalSoak)
    )
  }

  calculateAggravatedSoak() {
    const activeArmor = this.getActiveArmor()

    return (
      Number(this.state.stats.attribute.Stamina ? this.state.stats.attribute.Stamina.epic : 0)
        + Number(activeArmor.lethalSoak)
    )
  }

  renderAttributes() {
    let attributes = []

    if (this.state.stats.attribute) {
      for (let [ name, stats ] of Object.entries(this.state.stats.attribute)) {
        attributes.push((
          <StatCard
            database={this.props.database} 
            key={name} 
            title={name} 
            rating={stats.rating}
            epic={stats.epic}
          />
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
            <StatCard
              database={this.props.database} 
              key={name} 
              title={name} 
              rating={stats.rating}
            />
          ))
        }
      }
    }

    return abilities
  }

  renderMisc() {
    return [
      (
        <StatCard
          database={this.props.database} 
          key='legend' 
          title='Legend'
          rating={this.state.stats.legend.rating}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='willpower' 
          title='Willpower'
          rating={this.state.stats.willpower.rating}
        />
      )
    ]
  }

  renderCombatStats() {
    const damage = this.calculateDamage()
    const joinBattle = this.calculateJoinBattle()

    return [
       (
        <StatCard
          database={this.props.database} 
          key='accMelee' 
          title='Accuracy (Melee)'
          rating={this.calculateAccuracy('Melee')}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='accBrawl' 
          title='Accuracy (Brawl)'
          rating={this.calculateAccuracy('Brawl')}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='accMarksmanship' 
          title='Accuracy (Marksmanship)'
          rating={this.calculateAccuracy('Marksmanship')}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='accThrown' 
          title='Accuracy (Thrown)'
          rating={this.calculateAccuracy('Thrown')}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='damage' 
          title='Damage'
          rating={damage.dice}
          modifier={damage.modifier}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='dodgeDv' 
          title='Dodge DV'
          rating={this.calculateDodgeDv()}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='parryDv' 
          title='Parry DV'
          rating={this.calculateParryDv()}
        />
      ),
      (
        <StatCard
          database={this.props.database} 
          key='joinBattle' 
          title='Join Battle'
          rating={joinBattle.dice}
          rawBonus={joinBattle.rawBonus}
        />
      )
    ]
  }

  renderSoak() {
    return [
      (
        <View key='bashing' style={styles.statItem}>
          <Text style={styles.statName}>Bashing</Text>
          <Text style={styles.statValue}>{this.calculateBashSoak()}</Text>
        </View>
      ),
      (
        <View key='lethal' style={styles.statItem}>
          <Text style={styles.statName}>Lethal</Text>
          <Text style={styles.statValue}>{this.calculateLethalSoak()}</Text>
        </View>
      ),
      (
        <View key='aggravated' style={styles.statItem}>
          <Text style={styles.statName}>Aggravated</Text>
          <Text style={styles.statValue}>{this.calculateAggravatedSoak()}</Text>
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
            <Text>Misc</Text>
          </View>
          <View style={styles.statsGroup}>
            {this.renderMisc()}
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
          
          <View style={styles.statsGroupTitle}>
            <Text>Health</Text>
          </View>
          <View style={styles.statsGroup}>
            <Text>Health here</Text>
          </View>
        </View>
      </View>
    )
  }
}
