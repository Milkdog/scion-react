// @flow
import * as firebase from 'firebase'
import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'
import codePush from 'react-native-code-push'
import { styles } from '../resources/Stylesheet.js'
import SelectCharacterPage from './SelectCharacterPage.js'
import StatsPage from './StatsPage.js'
import BoonsKnacksPage from './BoonsKnacksPage.js'
import BirthrightsPage from './BirthrightsPage.js'
import CombatPage from './Combat/CombatPage.js'
import CharacterPage from './Character/CharacterPage.js'
import TabBar from './TabBar.js'
import LoginPage from './Login/LoginPage.js'

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
  // {
  //   id: 'roll-dice',
  //   name: 'Roll Dice',
  //   isPage: false
  // }
]

const storageCharacterKey = '@scion:character'
const storageUserEmailKey = '@scion:userEmal'
const storageUserPasswordKey = '@scion:userPassword'

class ScionApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isDbConnected: false,
      activePage: 'stats',
      dbRoot: null,
      database: null,
      character: null,
      userEmail: null,
      userPassword: null
    }
  }

  async componentDidMount() {
    await AsyncStorage.getItem(storageCharacterKey, (error, value) => {
      this.setState({
        character: value
      })
    })

    await AsyncStorage.getItem(storageUserEmailKey, (error, value) => {
      this.setState({
        userEmail: value
      })
    })
    
    await AsyncStorage.getItem(storageUserPasswordKey, (error, value) => {
      this.setState({
        userPassword: value
      })
    })

    if (this.state.userEmail && this.state.userPassword) {
      this.handleLogin()
    } else {
      this.setState({
        isLoading: false
      })
    }
  }

  componentWillUnmount() {
    firebase.auth().signOut()
  }

  handleLogin() {
    firebase.auth().signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword).catch(function(error) {
      console.log('Auth error', error)
    }).then((user) => {
      console.log('Logged in', user.uid)

      // Set DB base
      const dbRoot = firebase.database().ref('/users/').child(user.uid)
      let database = dbRoot
      if (this.state.character) {
        database = dbRoot.child(this.state.character)
      }

      this.setState({
        dbRoot,
        database,
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

  handleSetLogin(userEmail, userPassword) {
    AsyncStorage.setItem(storageUserEmailKey, userEmail)
    AsyncStorage.setItem(storageUserPasswordKey, userPassword)

    this.setState({
      userEmail,
      userPassword
    })
  }

  handlePageUpdate(newPage) {
    this.setState({
      activePage: newPage
    })
  }

  setCharacter(character) {
    AsyncStorage.setItem(storageCharacterKey, character)

    this.setState({
      character,
      database: this.state.dbRoot.child(character)
    })
  }

  getPage() {
    if (this.state.character === null) {
      return <SelectCharacterPage doSetCharacter={this.setCharacter.bind(this)} database={this.state.dbRoot} />
    }

    switch(this.state.activePage) {
      case 'stats':
        return <StatsPage database={this.state.database} />

      case 'boons-knacks':
        return <BoonsKnacksPage database={this.state.database} />

      case 'birthrights':
        return <BirthrightsPage database={this.state.database} />

      case 'combat':
        return <CombatPage database={this.state.database} />

      case 'character':
        return (
          <CharacterPage
            database={this.state.database} 
            dbRoot={this.state.dbRoot} 
            doSetCharacter={this.setCharacter.bind(this)}
          />
        )
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
      <TouchableOpacity key='change-character' onPress={() => {this.setState({character: null})}}>
        <Text style={[styles.tabButton, styles.tabSelectedCharacter]}>{this.state.character}</Text>
        <Text style={styles.tabButton}>Change Character</Text>
      </TouchableOpacity>
    ))

    // displayTabs.push((
    //   <Image 
    //     key='save' 
    //     source={require('./resources/Save-32.png')} 
    //     style={styles.tabIcon}
    //   />
    // ))

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

    if (!this.state.userEmail && !this.state.userPassword && !this.state.isDbConnected) {
      return (
        <LoginPage
          doSetLogin={ this.handleSetLogin.bind(this) }
          doLogin={ this.handleLogin.bind(this) }
        />
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

export default ScionApp