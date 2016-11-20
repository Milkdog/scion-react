// @flow
import * as firebase from 'firebase'
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

const firebaseConfig = {
    apiKey: "AIzaSyC4SXAxLdw91GuxcYP_ys9JTKcTtTyyLxE",
    authDomain: "scion-character-sheet.firebaseapp.com",
    databaseURL: "https://scion-character-sheet.firebaseio.com",
    storageBucket: "scion-character-sheet.appspot.com",
    messagingSenderId: "266368524623"
  };
firebase.initializeApp(firebaseConfig);

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
  },
  {
    id: 'roll-dice',
    name: 'Roll Dice',
    isPage: false
  }
]

class scion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      activePage: 'stats',
      database: null
    }
  }

  componentDidMount() {
    firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error)
    });

    this.setState({
      database: firebase.database().ref('/users/').child('test')
    })

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

  handleSave(savePath, data) {
    return this.state.database.child(savePath).set(data)
  }

  getPage() {
    switch(this.state.activePage) {
      case 'stats':
        return <StatsPage database={this.state.database} doSave={this.handleSave.bind(this)} />

      case 'boons-knacks':
        return <BoonsKnacksPage />
    }
  }

  getTabs() {
    const displayTabs = tabs.map((tab, index) => {
      console.log(tab)
      const tabStyle = tab.id == this.state.activePage ? styles.activeTab : {}
      return (
        <Text key={index} style={[styles.tabButton, tabStyle]} onPress={() => {this.handlePageUpdate(tab.id)}}>{tab.name}</Text>
      )
    })

    displayTabs.push((
      <Image 
        key='save' 
        source={require('./resources/Save-32.png')} 
        style={styles.tabIcon}
      />
    ))

    return displayTabs
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
    marginBottom: 50,
    paddingBottom: 20
  },
  tabButton: {
    color: '#aaaaaa'
  },
  activeTab: {
    color: 'white'
  },
  tabIcon: {
    height: 24,
    width: 24,
    justifyContent: 'center'
  }
})

AppRegistry.registerComponent('scion', () => scion);