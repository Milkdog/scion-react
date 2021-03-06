
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
import { styles } from '../../resources/Stylesheet.js'

import Modal from '../Modal.js'
import WeaponCard from './WeaponCard.js'

export default class WeaponsSection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      isModalVisible: false,
      isEdit: false,
      editIndex: '',
      newName: '',
      newDamageModifier: '0',
      newDamageType: 'Bashing',
      newAccuracyModifier: '0',
      newSpeed: '0', 
      newRange: '0',
      newDefenseValue: '0',
      newDescription: '',
      newIsActive: false
    }
  }
  
  componentDidMount() {
    this.getItemsFromDb()
  }

  componentWillUnmount() {
    this.props.database.child(this.getStoragePath()).off('value')
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
      damageModifier: this.state.newDamageModifier,
      damageType: this.state.newDamageType,
      accuracyModifier: this.state.newAccuracyModifier,
      speed: this.state.newSpeed, 
      range: this.state.newRange,
      defenseValue: this.state.newDefenseValue,
      description: this.state.newDescription,
      isActive: this.state.newIsActive
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
      newDamageModifier: item.damageModifier,
      newDamageType: item.damageType,
      newAccuracyModifier: item.accuracyModifier,
      newSpeed: item.speed, 
      newRange: item.range,
      newDefenseValue: item.defenseValue,
      newDescription: item.description,
      newIsActive: item.isActive
    })
  }

  handleDelete(index) {
    this.props.database.child(this.getStoragePath()).child(index).remove()
    this.getItemsFromDb()
  }

  handleActivate(index) {
    // Deactivate the other items
    for (let [ itemIndex, item ] of Object.entries(this.state.items)) {
      if (item.isActive) {
        this.props.database.child(this.getStoragePath()).child(itemIndex).child('isActive').set(false)
      }
    }
    
    // Activate this item
    this.props.database.child(this.getStoragePath()).child(index).child('isActive').set(true)
  }

  getStoragePath() {
      return 'weapons'
  }

  renderModal() {
    return (
      <Modal title='Save Weapon' isVisible={this.state.isModalVisible} onCancel={this.handleToggleModal.bind(this)}>
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
            <Text>Accuracy Modifier</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newAccuracyModifier} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newAccuracyModifier: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Damage Modifier</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newDamageModifier} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newDamageModifier: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Damage Type</Text>
          </View>
          <View style={styles.input}>
            <Picker
              selectedValue={this.state.newDamageType}
              onValueChange={(value) => this.setState({newDamageType: value})}>
              <Picker.Item label="Bashing" value="Bashing" />
              <Picker.Item label="Lethal" value="Lethal" />
              <Picker.Item label="Aggravated" value="Aggravated" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Speed</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newSpeed} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newSpeed: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Range</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newRange} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newRange: text})} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Defense Value</Text>
          </View>
          <View style={styles.input}>
            <TextInput defaultValue={this.state.newDefenseValue} keyboardType='numeric' selectTextOnFocus={true} onChangeText={(text) => this.setState({newDefenseValue: text})} />
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
        <WeaponCard 
          key={index} 
          doActivate={this.handleActivate.bind(this, item.index)}
          onDelete={() => {this.handleDelete(item.index)}} 
          onEdit={this.handleEdit.bind(this, item)} 
          {...item} 
        />
      )
    })
  }

  render() {
    return (
      <View>
        {this.renderModal()}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Weapons</Text>
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
