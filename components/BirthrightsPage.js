// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'

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
          style={styles.button}
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

const styles = StyleSheet.create({
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 12,
    textAlign: 'center'
  },
  button: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#CCCCCC',
    width: 200,
    alignSelf: 'flex-end'
  },
  birthrightList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  },
  label: {
    flex: .3
  },
  input: {
    flex: .7
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    //backgroundColor: 'black',
    opacity: .5
  },
  modal: {
    top: 100,
    width: 500,
    padding: 20,
    backgroundColor: 'aliceblue',
    borderWidth: 2,
    borderRadius: 10,
  }
});