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

export default class CharacterPage extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isLoaded: false,
      name: '',
      calling: '',
      nature: '',
      pantheon: '',
      god: ''
    }
  }

  componentDidMount() {
    // Load state from DB
    this.props.database.child(this.getStoragePath()).on('value', (snapshotData) => {
      if (snapshotData.val()) {
        this.setState(snapshotData.val())
        this.setState({
          isLoaded: true
        })
      }
    })  
  }

  saveData(data) {
    if(this.state.isLoaded) {
      this.setState(data, () => {
        this.props.database.child(this.getStoragePath()).set(this.state)
      })
    }
  }

  async handleUpdateName(name) {
    if (this.state.isLoaded && name) {
      await this.saveData({name})

      this.props.database.once('value', (snapshotData) => {
        this.props.dbRoot.child(name).set(snapshotData.val())
        this.props.database.remove()
        this.props.doSetCharacter(name)
      })
    }
  }

  getStoragePath() {
   return 'character'
  }

  render() {
    return (
      <View style={styles.characterPageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Character</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Name</Text>
          </View>
          <View style={styles.input}>
            <TextInput 
              value={this.state.name}
              selectTextOnFocus={true}
              onChangeText={(text) => this.handleUpdateName(text)}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Calling</Text>
          </View>
          <View style={styles.input}>
            <TextInput 
              value={this.state.calling}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({calling: text})}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Nature</Text>
          </View>
          <View style={styles.input}>
            <TextInput 
              value={this.state.nature}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({nature: text})}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>Pantheon</Text>
          </View>
          <View style={styles.input}>
            <TextInput 
              value={this.state.pantheon}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({pantheon: text})}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.label}>
            <Text>God</Text>
          </View>
          <View style={styles.input}>
            <TextInput 
              value={this.state.god}
              selectTextOnFocus={true}
              onChangeText={(text) => this.saveData({god: text})}
            />
          </View>
        </View>

        
      </View>
    )
  }
}
