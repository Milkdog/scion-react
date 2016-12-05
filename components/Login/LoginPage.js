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
import { styles } from '../../resources/Stylesheet.js'


export default class SelectCharacterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userEmail: null,
      userPassword: null
    }
  }

  handleCreateAccount() {

  }

  handleLogin() {
    this.props.doLogin(this.state.userEmail, this.state.userPassword)
  }

  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        <View style={styles.characterPageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <TextInput
            placeholder='Email'
            onChangeText={(text) => this.setState({userEmail: text})}
          />
           <TextInput
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({userPassword: text})}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleLogin.bind(this)}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.handleCreateAccount.bind(this)}
          >
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
