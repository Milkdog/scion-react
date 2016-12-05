// @flow
import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'
import codePush from 'react-native-code-push'
import ScionApp from './components/ScionApp.js'

let App = ScionApp

// If Code Push is enabled, turn it on
if (codePush) {
  App = codePush({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE
  })(ScionApp)
}

AppRegistry.registerComponent('scion', () => App)