// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import { styles } from '../../resources/Stylesheet.js'

import CombatStatsSection from './CombatStatsSection.js'
import WeaponsSection from './WeaponsSection.js'
import ArmorSection from './ArmorSection.js'

export default class WeaponsPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.boonsKnacksContainer}>
        <View style={[styles.weaponArmorContainer, styles.splitContainer, styles.column]}>
          <WeaponsSection database={this.props.database} />
          <ArmorSection database={this.props.database} />
        </View>
        <View style={[styles.splitContainer, styles.column]}>
          <CombatStatsSection database={this.props.database} />
        </View>
      </View>
    )
  }
}
