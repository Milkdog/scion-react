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

import Modal from './Modal.js'
import BoonCard from './BoonCard.js'

export default class BoonsKnacksPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boons: [],
      knacks: [],
      isBoonModalVisible: false,
      newBoonName: '',
      newBoonRating: '',
      newBoonPurview: '',
      newBoonDicePool: '',
      newBoonDescription: ''
    }
  }
  
  componentDidMount() {
    this.getBoonsFromDb()
    this.getKnacksFromDb()
  }

  getBoonsFromDb() {
    // Load state from DB
    this.props.database.child(this.getBoonStoragePath()).on('child_added', (snapshotData) => {
      const stateBoons = this.state.boons
      const dbBoons = snapshotData.val()
      dbBoons.index = snapshotData.key
      stateBoons.push(dbBoons)
      this.setState({
        boons: stateBoons
      })
    })
  }

  getKnacksFromDb() {
     this.props.database.child(this.getKnackStoragePath()).on('child_added', (snapshotData) => {
      const stateKnacks = this.state.knacks
      const dbKnacks = snapshotData.val()
      dbKnacks.index = snapshotData.key
      stateKnacks.push(dbKnacks)
      this.setState({
        knacks: stateKnacks
      })
    })
  }

  handleToggleBoonModal() {
    this.setState({
      isBoonModalVisible: !this.state.isBoonModalVisible
    })
  }

  handleAddBoon() {
    const newBoon = this.state.boons

    newBoon.push({
      name: this.state.newBoonName,
      rating: this.state.newBoonRating,
      purview: this.state.newBoonPurview,
      dicePool: this.state.newBoonDicePool,
      description: this.state.newBoonDescription
    })

    this.setState({
      boons: newBoon,
      isBoonModalVisible: false
    }, () => {
      this.props.database.child(this.getBoonStoragePath()).set(this.state.boons)
    })
  }

  handleDeleteBoon(index) {
    this.props.database.child(this.getBoonStoragePath()).child(index).remove(() => {
      this.setState({
        boons: []
      })
      this.getBoonsFromDb()
    })
  }

  getBoonStoragePath() {
      return 'boons'
  }

  getKnackStoragePath() {
      return 'knacks'
  }


  renderBoonModal() {
    return (
      <Modal title='Add Boon' isVisible={this.state.isBoonModalVisible} onCancel={this.handleToggleBoonModal.bind(this)}>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newBoonName: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Rating</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newBoonRating: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Purviews</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newBoonPurview: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Dice Pool</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newBoonDicePool: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Description</Text>
          </View>
          <View style={styles.input}>
            <TextInput onChangeText={(text) => this.setState({newBoonDescription: text})} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleAddBoon.bind(this)}
        >
          <Text>Save Boon</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderBoons() {
    return this.state.boons.map((boon, index) => {
      return (
        <BoonCard key={index} onDelete={() => {this.handleDeleteBoon(boon.index)}} {...boon} />
      )
    })
  }

  render() {
    return (
      <View style={styles.boonsKnacksContainer}>
        {this.renderBoonModal()}
        <View style={styles.splitContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Boons</Text>
            <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleToggleBoonModal.bind(this)}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
          <Text>{JSON.stringify(this.state)}</Text>
          <View style={styles.cardList}>
            {this.renderBoons()}
          </View>
        </View>
        <View style={styles.splitContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Knacks</Text>
          </View>
        </View>
      </View>
    );
  }
}
