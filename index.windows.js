// @flow
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import { styles } from './resources/Stylesheet.js'
import StatsPage from './components/StatsPage.js'
import BoonsKnacksPage from './components/BoonsKnacksPage.js'
import BirthrightsPage from './components/BirthrightsPage.js'
import TabBar from './components/TabBar.js'

const firebaseConfig = {
  apiKey: "AIzaSyC4SXAxLdw91GuxcYP_ys9JTKcTtTyyLxE",
  authDomain: "scion-character-sheet.firebaseapp.com",
  databaseURL: "https://scion-character-sheet.firebaseio.com",
  storageBucket: "scion-character-sheet.appspot.com",
  messagingSenderId: "266368524623"
}

// const firebaseConfig =  {
//   apiKey: "AIzaSyDsi1gl8812Qm3JBomWUL76TBS9ha2Ejg4",
//   authDomain: "alternate-project-be493.firebaseapp.com",
//   databaseURL: "https://alternate-project-be493.firebaseio.com",
//   storageBucket: "",
//   messagingSenderId: "598886915971"
// }

firebase.initializeApp(firebaseConfig)

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
    id: 'birthrights',
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
      isDbConnected: false,
      activePage: 'boons-knacks',
      database: null
    }
  }

  componentDidMount() {
// this.setState({
//   isLoading: false
// })

// return null

    // Log user in
    firebase.auth().signInWithEmailAndPassword('chris@chrismielke.com', 'test123').catch(function(error) {
      console.log(error)
    }).then((user) => {
      console.log('logged in', user.uid)

      // Set DB base
      const firebaseDb = firebase.database().ref('/users/').child(user.uid)
      this.setState({
        database: firebaseDb,
        isLoading: false
      })
    })

    // Check DB connection status
    firebase.database().ref(".info/connected").on("value", (snap) => {
      this.setState({
        isDbConnected: (snap.val() === true)
      }) 
    })
  }

  componentWillUnmount() {
    firebase.auth().signOut()
  }

  handlePageUpdate(newPage) {
    this.setState({
      activePage: newPage
    })
  }

  getPage() {
    switch(this.state.activePage) {
      case 'stats':
        return <StatsPage database={this.state.database} />

      case 'boons-knacks':
        return <BoonsKnacksPage database={this.state.database} />

      case 'birthrights':
        return <BirthrightsPage database={this.state.database} />
    }
  }

  getTabs() {
    const displayTabs = tabs.map((tab, index) => {
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
        <ScrollView style={styles.mainContainer} contentContainerStyle={styles.mainContent}>
          {this.getPage()}
        </ScrollView>
        <TabBar>
          {this.getTabs()}
        </TabBar>
        <View style={styles.onlineStatusContainer}>
          {this.state.isDbConnected ? <Text style={styles.goodText}>:)</Text> : <Text style={styles.warningText}>:(</Text>}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('scion', () => scion);