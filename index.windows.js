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
import AttributeGroup from './components/AttributeGroup.js'
import AttributeCard from './components/attributeCard.js'
import AbilityCard from './components/AbilityCard.js'

const attributes = [
  {
    groupName: 'Physical',
    items: [
      {
        shortName: 'Str',
        name: 'Strength'
      },
      {
        shortName: 'Dex',
        name: 'Dexterity'
      },
      {
        shortName: 'Sta',
        name: 'Stamina'
      },
    ]
  },
  {
    groupName: 'Social',
    items: [
      {
        shortName: 'Cha',
        name: 'Charisma'
      },
      {
        shortName: 'Man',
        name: 'Manipulation'
      },
      {
        shortName: 'App',
        name: 'Appearance'
      },
    ]
  },
  {
    groupName: 'Mental',
    items: [
      {
        shortName: 'Per',
        name: 'Perception'
      },
      {
        shortName: 'Int',
        name: 'Intelligence'
      },
      {
        shortName: 'Wit',
        name: 'Wits'
      },
    ]
  }
]

const abilities = [
  {
    name: 'Academics'
  },
  {
    name: 'Animal Ken'
  },
  {
    name: 'Art',
    options: [
      'Sculpture',
      'Painting'
    ]
  },
  {
    name: 'Athletics'
  },
  {
    name: 'Awareness'
  },
  {
    name: 'Brawl'
  },
  {
    name: 'Command'
  },
  {
    name: 'Control'
  },
  {
    name: 'Craft'
  },
  {
    name: 'Empathy'
  },
  {
    name: 'Fortitude'
  },
  {
    name: 'Integrity'
  },
  {
    name: 'Investigation'
  },
  {
    name: 'Larceny'
  },
  {
    name: 'Marksmanship'
  },
  {
    name: 'Medicine'
  },
  {
    name: 'Melee'
  },
  {
    name: 'Occult'
  },
  {
    name: 'Politics'
  },
  {
    name: 'Presence'
  },
  {
    name: 'Science'
  },
  {
    name: 'Stealth'
  },
  {
    name: 'Survival'
  },
  {
    name: 'Thrown'
  },
]

class scion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
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

  renderAttributes() {
    return attributes.map((group, groupIndex) => {
      const attributeCards = group.items.map((attribute, index) => {
        return (
          <AttributeCard key={index} title={attribute.name} />
        )
      })

      return (
        <View key={groupIndex} style={styles.attributeGroup}>
          <AttributeGroup title={group.groupName}>
            {attributeCards}
          </AttributeGroup>
        </View>
      ) 
    })
  }

  renderAbilities() {
    return abilities.map((ability, index) => {
      return (
        <AbilityCard key={index} title={ability.name}/>
      )
    })
  }

  render() {
    const routes = [
      {title: 'Home', index: 0},
      {title: 'Attributes', index: 1},
    ];

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <ProgressRingWindows style={{height: 150, width: 150}} />
        </View>
      )
    }
    
    return (
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Attributes</Text>
        </View>
        <View style={styles.attributesContainer}>
          {this.renderAttributes()}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Abilties</Text>
        </View>
        <View style={styles.abilitiesContainer}>
          {this.renderAbilities()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'aliceblue',
    paddingVertical: 4,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  },
  attributesContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  attributeGroup: {
    alignItems: 'center',
    minWidth: 300,
    maxHeight: 260
  },
  abilitiesContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxHeight: 260
  }
});

AppRegistry.registerComponent('scion', () => scion);