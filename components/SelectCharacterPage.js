// @flow

import React, { Component } from 'react'
import {  
  Text,
  View,
  Button,
  Picker,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { styles } from '../resources/Stylesheet.js'


export default class SelectCharacterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characters: [],
      selectedCharacter: null
    }
  }

  componentDidMount() {
    this.getFromDb()
  }

  getFromDb() {
    this.setState({
      isEdit: false,
      characters: []
    }, () => {
      // Load state from DB
      this.props.database.orderByKey().on('value', (snapshotData) => {
        if (snapshotData.val() !== null) {
          let characters = []
          for (let character of Object.keys(snapshotData.val())) {
            characters.push(character)
          }

          this.setState({
            characters
          })
        }
      })
    })
  }

  componentWillUnmount() {
    this.props.database.off('value')
  }

  handleSetCharacter() {
    this.props.doSetCharacter(this.state.selectedCharacter)
  }

  async handleCreateCharacter() {
    await this.props.database.child(this.state.selectedCharacter).set({character: {name: this.state.selectedCharacter}})
    this.handleSetCharacter()
  }

  renderPickerItems() {
    return this.state.characters.map((character, index) => {
      return <Picker.Item key={index} label={character} value={character} />
    })
  }

  render() {
    return (
      <View>
        <View style={styles.characterPageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Select Character</Text>
          </View>
          <Picker
            onValueChange={(text) => this.setState({selectedCharacter: text})}>
            {this.renderPickerItems()}
          </Picker>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleSetCharacter.bind(this)}
          >
            <Text>Load Character</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.characterPageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Character</Text>
          </View>
          <TextInput
            placeholder='Character Name'
            onChangeText={(text) => this.setState({selectedCharacter: text})}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleCreateCharacter.bind(this)}
          >
            <Text>Create Character</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
