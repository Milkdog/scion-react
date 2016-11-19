// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  AsyncStorage,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import StatsPage from './components/StatsPage.js'
import BoonsKnacksPage from './components/BoonsKnacksPage.js'
import TabBar from './components/TabBar.js'

const tabs = [
  {
    id: 'stats',
    name: 'Stats'
  },
  {
    id: 'boons-knacks',
    name: 'Boons & Knacks'
  },
  {
    id: 'brithrights',
    name: 'Birthrights'
  },
  {
    id: 'combat',
    name: 'Combat'
  },
  {
    id: 'character',
    name: 'Character'
  }
]

class scion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      activePage: 'stats'
    }
  }

  componentDidMount() {
    // Use getAllKeys as a check for everything else loading
    AsyncStorage.getAllKeys((error, result) => {
      this.setState({
        isLoading: false
      })
    })
  }

  handlePageUpdate(newPage) {
    this.setState({
      activePage: newPage
    })
  }

  getPage() {
    switch(this.state.activePage) {
      case 'stats':
        return <StatsPage />

      case 'boons-knacks':
        return <BoonsKnacksPage />
    }
  }

  getTabs() {
    return tabs.map((tab, index) => {
      console.log(tab)
      const tabStyle = tab.id == this.state.activePage ? styles.activeTab : {}
      return (
        <Text key={index} style={[styles.tabButton, tabStyle]} onPress={() => {this.handlePageUpdate(tab.id)}}>{tab.name}</Text>
      )
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <ProgressRingWindows style={{height: 150, width: 150}} />
        </View>
      )
    }
    
    return (
      <View style={styles.fullContainer}>
        <ScrollView style={styles.mainContent}>
          {this.getPage()}
        </ScrollView>
        <TabBar>
          {this.getTabs()}
        </TabBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContent: {
    
  },
  tabButton: {
    color: '#aaaaaa'
  },
  activeTab: {
    color: 'white'
  }
})

AppRegistry.registerComponent('scion', () => scion);