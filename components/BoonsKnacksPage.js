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
import { styles } from '../resources/Stylesheet.js'

import BoonsSection from './BoonsSection.js'
import KnacksSection from './KnacksSection.js'

export default class BoonsKnacksPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.boonsKnacksContainer}>
        <BoonsSection database={this.props.database} />
        <KnacksSection database={this.props.database} />
      </View>
    )
  }
}
