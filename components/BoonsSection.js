
// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  TextInput,
  Picker,
  TouchableOpacity
} from 'react-native'
import { styles } from '../resources/Stylesheet.js'
import { purviews } from '../resources/Constants.js'

import Modal from './Modal.js'
import BoonCard from './BoonCard.js'

export default class BoonsSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      boons: [],
      isModalVisible: false,
      isEdit: false,
      editIndex: '',
      newName: '',
      newRating: '',
      newCost: '',
      newPurview: '',
      newDicePool: '',
      newDescription: ''
    }
  }
  
  componentDidMount() {
    this.getBoonsFromDb()
  }

  getBoonsFromDb() {
    // Clear the boons from the state
    this.setState({
      isEdit: false,
      boons: []
    }, () => {
      // Load state from DB
      this.props.database.child(this.getStoragePath()).orderByChild('purview').on('value', (snapshotData) => {

        const boons = snapshotData.val().map((boon, index) => {
          boon.index = index
          return boon
        })
        
        // Sort the boons
        boons.sort(function(a, b) {
          return a.rating - b.rating
        })

        this.setState({
          isEdit: false,
          boons: boons
        })
      })
    })
  }

  handleToggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isEdit: false
    })
  }

  getForm() {
    return {
      name: this.state.newName,
      rating: this.state.newRating,
      cost: this.state.newCost,
      purview: this.state.newPurview,
      dicePool: this.state.newDicePool,
      description: this.state.newDescription
    }
  }

  handleAddBoon() {
    const newBoon = [this.getForm()]

    this.props.database.child(this.getStoragePath()).set(this.state.boons.concat(newBoon))
    this.setState({
      isModalVisible: false
    })
  }

  handleUpdateBoon() {
    this.props.database.child(this.getStoragePath()).child(this.state.editIndex).set(this.getForm())

    this.setState({
      isModalVisible: false
    })
  }

  handleEditBoon(boon) {
    this.setState({
      isModalVisible: true,
      isEdit: true,
      editIndex: boon.index,
      newName: boon.name,
      newRating: boon.rating,
      newCost: boon.cost,
      newPurview: boon.purview,
      newDicePool: boon.dicePool,
      newDescription: boon.description
    })
  }

  handleDeleteBoon(index) {
    this.props.database.child(this.getStoragePath()).child(index).remove()
  }

  getStoragePath() {
      return 'boons'
  }

  renderPurviewPickerItems() {
    return purviews.map((purview, index) => {
      return <Picker.Item key={index} label={purview} value={purview} />
    })
  }

  renderModal() {
    return (
      <Modal title='Save Boon' isVisible={this.state.isModalVisible} onCancel={this.handleToggleModal.bind(this)}>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newName} selectTextOnFocus={true} onChangeText={(text) => this.setState({newName: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Purview</Text>
          </View>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.newPurview}
              onValueChange={(text) => this.setState({newPurview: text})}>
              {this.renderPurviewPickerItems()}
            </Picker>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Rating</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newRating} selectTextOnFocus={true} onChangeText={(text) => this.setState({newRating: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Cost</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newCost} selectTextOnFocus={true} onChangeText={(text) => this.setState({newCost: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Dice Pool</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newDicePool} selectTextOnFocus={true} onChangeText={(text) => this.setState({newDicePool: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Description</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newDescription} selectTextOnFocus={true} onChangeText={(text) => this.setState({newDescription: text})} />
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
      <View style={[styles.splitContainer, styles.column]}>
        {this.renderModal()}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Boons</Text>
          <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleToggleModal.bind(this)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {this.renderBoons()}
        </View>
      </View>
    )
  }
}
