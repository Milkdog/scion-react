
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
import { attributes } from '../resources/Constants.js'

import Modal from './Modal.js'
import KnackCard from './KnackCard.js'

export default class KnacksSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      knacks: [],
      isModalVisible: false,
      isEdit: false,
      editIndex: '',
      newName: '',
      newCost: '',
      newAttribute: '',
      newDescription: ''
    }
  }
  
  componentDidMount() {
    this.getKnacksFromDb()
  }

  getKnacksFromDb() {
    // Clear the knacks from the state
    this.setState({
      isEdit: false,
      knacks: []
    }, () => {
      // Load state from DB
      this.props.database.child(this.getStoragePath()).orderByChild('epicAttribute').on('value', (snapshotData) => {
        // If it doesn't exist in the DB, skip it
        if (snapshotData.val() === null) {
          return null
        }

        const knacks = snapshotData.val().map((knack, index) => {
          knack.index = index
          return knack
        })

        this.setState({
          isEdit: false,
          knacks: knacks
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
      cost: this.state.newCost,
      attribute: this.state.newAttribute,
      description: this.state.newDescription
    }
  }

  handleAddKnack() {
    const newKnack = [this.getForm()]

    this.props.database.child(this.getStoragePath()).set(this.state.knacks.concat(newKnack))
    this.setState({
      isModalVisible: false
    })
  }

  handleUpdateKnack() {
    this.props.database.child(this.getStoragePath()).child(this.state.editIndex).set(this.getForm())

    this.setState({
      isModalVisible: false
    })
  }

  handleEditKnack(knack) {
    this.setState({
      isModalVisible: true,
      isEdit: true,
      editIndex: knack.index,
      newName: knack.name,
      newAttribute: knack.epicAttribute,
      newDescription: knack.description
    })
  }

  handleDeleteKnack(index) {
    this.props.database.child(this.getStoragePath()).child(index).remove()
  }

  getStoragePath() {
      return 'knacks'
  }

  renderAttributePickerItems() {
    return attributes.map((attribute, index) => {
      return <Picker.Item key={index} label={attribute} value={attribute} />
    })
  }

  renderModal() {
    return (
      <Modal title='Save Knack' isVisible={this.state.isModalVisible} onCancel={this.handleToggleModal.bind(this)}>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newName} onChangeText={(text) => this.setState({newName: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Epic Attribute</Text>
          </View>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.newAttribute}
              onValueChange={(text) => this.setState({newAttribute: text})}>
              {this.renderAttributePickerItems()}
            </Picker>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Cost</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newCost} onChangeText={(text) => this.setState({newCost: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Description</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newDescription} onChangeText={(text) => this.setState({newDescription: text})} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.state.isEdit ? this.handleUpdateKnack.bind(this) : this.handleAddKnack.bind(this)}
        >
          <Text>{this.state.isEdit ? 'Update' : 'Save'} Knack</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderKnacks() {
    return this.state.knacks.map((knack, index) => {
      return (
        <KnackCard 
          key={index} 
          onDelete={() => {this.handleDeleteKnack(knack.index)}} 
          onEdit={this.handleEditKnack.bind(this, knack)} 
          {...knack} 
        />
      )
    })
  }

  render() {
    return (
      <View style={[styles.splitContainer, styles.column]}>
        {this.renderModal()}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Knacks</Text>
          <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleToggleModal.bind(this)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {this.renderKnacks()}
        </View>
      </View>
    )
  }
}
