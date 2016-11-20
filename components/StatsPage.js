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
import AttributeGroup from './AttributeGroup.js'
import AttributeCard from './AttributeCard.js'
import AbilityCard from './AbilityCard.js'
import WillpowerCard from './WillpowerCard.js'
import LegendCard from './LegendCard.js'

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

export default class StatsPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowEmptyAbilities: true
    }
  }

  renderAttributes() {
    return attributes.map((group, groupIndex) => {
      const attributeCards = group.items.map((attribute, index) => {
        return (
          <AttributeCard 
            key={index} 
            title={attribute.name} 
            database={this.props.database} 
            doSave={this.props.doSave.bind(this)} 
          />
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
    const groupLength = Math.ceil(abilities.length / 3)
console.log(groupLength)
    const abilitiesGroups = []

    for(i = 1; i <= 3; i++) {
      console.log('Loop')
      console.log(i) 
      const sliceStart = (i - 1) * groupLength
      console.log(sliceStart)
      const abilitiesGroup = abilities.slice(sliceStart, sliceStart + groupLength)

      const abilityCards = abilitiesGroup.map((ability, index) => {
        return (
          <AbilityCard key={index} showEmpty={this.state.isShowEmptyAbilities} title={ability.name}/>
        )
      })

      abilitiesGroups.push(
        <View key={i} style={styles.abilityGroup}>
          {abilityCards}
        </View>
      )
    }

   return abilitiesGroups
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Attributes</Text>
            </View>
            <View style={styles.attributesContainer}>
              {this.renderAttributes()}
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Abilties</Text>
            </View>
            <View style={styles.abilitiesContainer}>
              {this.renderAbilities()}
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Other</Text>
            </View>
            <View style={styles.additionalInfoContainer}>
              <LegendCard />
              <WillpowerCard />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  abilityGroup: {
    flexDirection: 'column',
    width: 300,
    alignItems: 'center'
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  }
});