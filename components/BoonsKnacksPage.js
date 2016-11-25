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
      isEdit: false,
      editIndex: '',
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
    // Clear the boons from the state
    this.setState({
      isEdit: false,
      boons: []
    }, () => {
      // Load state from DB
      this.props.database.child(this.getBoonStoragePath()).orderByChild('purview').on('child_added', (snapshotData) => {
        const stateBoons = this.state.boons
        const dbBoons = snapshotData.val()
        dbBoons.index = snapshotData.key
        stateBoons.push(dbBoons)
        this.setState({
          isEdit: false,
          boons: stateBoons
        })
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
      isBoonModalVisible: !this.state.isBoonModalVisible,
      isEdit: false
    })
  }

  handleAddBoon() {
    const newBoon = [{
      name: this.state.newBoonName,
      rating: this.state.newBoonRating,
      purview: this.state.newBoonPurview,
      dicePool: this.state.newBoonDicePool,
      description: this.state.newBoonDescription
    }]

    this.setState({
      boons: this.state.boons.concat(newBoon),
      isBoonModalVisible: false
    }, () => {
      this.props.database.child(this.getBoonStoragePath()).set(this.state.boons)
    })
  }

  handleUpdateBoon() {
    const boon = {
      name: this.state.newBoonName,
      rating: this.state.newBoonRating,
      purview: this.state.newBoonPurview,
      dicePool: this.state.newBoonDicePool,
      description: this.state.newBoonDescription
    }

    this.props.database.child(this.getBoonStoragePath()).child(this.state.editIndex).set(boon)
    this.getBoonsFromDb()
    this.setState({
      isBoonModalVisible: false
    })
  }

  handleEditBoon(boon) {
    this.setState({
      isBoonModalVisible: true,
      isEdit: true,
      editIndex: boon.index,
      newBoonName: boon.name,
      newBoonRating: boon.rating,
      newBoonPurview: boon.purview,
      newBoonDicePool: boon.dicePool,
      newBoonDescription: boon.description
    })
  }

  handleDeleteBoon(index) {
    this.props.database.child(this.getBoonStoragePath()).child(index).remove(() => {
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
      <Modal title='Save Boon' isVisible={this.state.isBoonModalVisible} onCancel={this.handleToggleBoonModal.bind(this)}>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBoonName} onChangeText={(text) => this.setState({newBoonName: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Rating</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBoonRating} onChangeText={(text) => this.setState({newBoonRating: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Purviews</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBoonPurview} onChangeText={(text) => this.setState({newBoonPurview: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Dice Pool</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBoonDicePool} onChangeText={(text) => this.setState({newBoonDicePool: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Description</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBoonDescription} onChangeText={(text) => this.setState({newBoonDescription: text})} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.state.isEdit ? this.handleUpdateBoon.bind(this) : this.handleAddBoon.bind(this)}
        >
          <Text>{this.state.isEdit ? 'Update' : 'Save'} Boon</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderBoons() {
    return this.state.boons.map((boon, index) => {
      return (
        <BoonCard 
          key={index} 
          onDelete={() => {this.handleDeleteBoon(boon.index)}} 
          onEdit={this.handleEditBoon.bind(this, boon)} 
          {...boon} 
        />
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
