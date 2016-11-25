// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'

import { styles } from '../resources/Stylesheet.js'

import BirthrightCard from './BirthrightCard.js'
import Modal from './Modal.js'

export default class BirthrightsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
        birthrights: [],
        isAddModalVisible: false,
        newName: '',
        newRating: '',
        newPurviews: '',
        newEffect: ''
    }
  }

   componentDidMount() {
    // Load state from DB
    this.props.database.child(this.getStoragePath()).on('child_added', (snapshotData) => {
      const stateBirthright = this.state.birthrights
      const dbBirthright = snapshotData.val()
      dbBirthright.index = snapshotData.key
      stateBirthright.push(dbBirthright)
      this.setState({
        birthrights: stateBirthright
      })
    })
  }

  handleTriggerBirthrightModal() {
    this.setState({
      isAddModalVisible: true
    })
  }

  handleAddBirthright() {
    const newBirthrights = this.state.birthrights

    newBirthrights.push({
      name: this.state.newName,
      rating: this.state.newRating,
      purviews: this.state.newPurviews,
      effects: this.state.newEffect
    })

    this.setState({
      birthrights: newBirthrights,
      isAddModalVisible: false
    }, () => {
      this.props.database.child(this.getStoragePath()).set(this.state.birthrights)
    })
  }

  getStoragePath() {
      return 'birthrights'
  }

  handleCancelModal() {
    this.setState({
      isAddModalVisible: false
    })
  }

  renderBirthrights() {
    return this.state.birthrights.map((birthright, index) => {
      return (
        <BirthrightCard key={index} {...birthright} />
      )
    })
  }

  renderModal() {
    return (
      <Modal title='Add Birthright' isVisible={this.state.isAddModalVisible} onCancel={this.handleCancelModal.bind(this)}>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newName: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Rating</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newRating: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Purviews</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newPurviews: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Effect</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newEffect: text})} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAddBirthright.bind(this)}
        >
          <Text>Save Birthright</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        <TouchableOpacity
          style={[styles.button, styles.addBirthrightButton]}
          onPress={this.handleTriggerBirthrightModal.bind(this)}
        >
          <Text>Add Birthright</Text>
        </TouchableOpacity>
        <View style={styles.birthrightList}>
          {this.renderBirthrights()}
        </View>
      </View>
    );
  }
}
