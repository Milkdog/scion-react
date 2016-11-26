
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

export default class ArmorSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isModalVisible: false,
      isEdit: false,
      editIndex: '',
      newName: '',
      newBashSoak: '',
      newLethalSoak: '',
      newMobilityPenalty: '',
      newDescription: ''
    }
  }
  
  componentDidMount() {
    this.getItemsFromDb()
  }

  getItemsFromDb() {
    // Clear the knacks from the state
    this.setState({
      isEdit: false,
      items: []
    }, () => {
      // Load state from DB
      this.props.database.child(this.getStoragePath()).on('value', (snapshotData) => {
        // If it doesn't exist in the DB, skip it
        if (snapshotData.val() === null) {
          return null
        }

        const items = snapshotData.val().map((item, index) => {
          item.index = index
          return item
        })

        this.setState({
          isEdit: false,
          items: items
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
      bashSoak: this.state.newBashSoak,
      lethalSoak: this.state.newLethalSoak,
      mobilityPenalty: this.state.newMobilityPenalty,
      description: this.state.newDescription
    }
  }

  handleAdd() {
    const newItem = [this.getForm()]

    this.props.database.child(this.getStoragePath()).set(this.state.items.concat(newItem))
    this.setState({
      isModalVisible: false
    })
  }

  handleUpdate() {
    this.props.database.child(this.getStoragePath()).child(this.state.editIndex).set(this.getForm())

    this.setState({
      isModalVisible: false
    })
  }

  handleEdit(item) {
    this.setState({
      isModalVisible: true,
      isEdit: true,
      editIndex: item.index,
      newName: item.name,
      newBashSoak: item.bashSoak,
      newLethalSoak: item.lethalSoak,
      newMobilityPenalty: item.mobilityPenalty,
      newDescription: item.description
    })
  }

  handleDelete(index) {
    this.props.database.child(this.getStoragePath()).child(index).remove()
    this.getItemsFromDb()
  }

  getStoragePath() {
      return 'armor'
  }

  renderModal() {
    return (
      <Modal title='Save Armor' isVisible={this.state.isModalVisible} onCancel={this.handleToggleModal.bind(this)}>
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
            <Text>Bash Soak</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newBashSoak} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newBashSoak: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Lethal Soak</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newLethalSoak} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newLethalSoak: text})} />
          </View>
        </View>

        

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Mobility Penalty</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newMobilityPenalty} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newMobilityPenalty: text})} />
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
          onPress={this.state.isEdit ? this.handleUpdate.bind(this) : this.handleAdd.bind(this)}
        >
          <Text>{this.state.isEdit ? 'Update' : 'Save'} Weapon</Text>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderItems() {
    return this.state.items.map((item, index) => {
      return (
        <ArmorCard 
          key={index} 
          onDelete={() => {this.handleDelete(item.index)}} 
          onEdit={this.handleEdit.bind(this, item)} 
          {...item} 
        />
      )
    })
  }

  render() {
    return (
      <View style={styles.splitContainer}>
        {this.renderModal()}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Armor</Text>
          <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleToggleModal.bind(this)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {this.renderItems()}
        </View>
      </View>
    )
  }
}
