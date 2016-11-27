// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  Text,
  View,
  ScrollView,
  Button,
  AsyncStorage,
  Image,
  Navigator,
  TextInput,
  TouchableOpacity
} from 'react-native'
import {
  ProgressRingWindows
} from 'react-native-windows'

import Dimensions from 'Dimensions'
import { styles } from '../resources/Stylesheet.js'

import AttributeGroup from './AttributeGroup.js'
import AttributeCard from './AttributeCard.js'
import AbilityCard from './AbilityCard.js'
import WillpowerCard from './WillpowerCard.js'
import LegendCard from './LegendCard.js'
import ExperienceCard from './ExperienceCard.js'

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
    specialty: true
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
    name: 'Control',
    specialty: true
  },
  {
    name: 'Craft',
    specialty: true
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
    name: 'Science',
    specialty: true
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
      dbAbilities: [],
      isAbilitiesLoaded: false,
      isShowEmptyAbilities: true,
      smallScreen: (Dimensions.get('window').width <= 700)
    }
  }

   componentDidMount() {
    // Load state from DB
    this.props.database.child('ability').on('value', (snapshotData) => {
      let dbAbilities = []

      if (snapshotData.val()) {
        for (let [ name, ability ] of Object.entries(snapshotData.val())) {
          ability.name = name
          dbAbilities.push(ability)
        }
      }

      this.setState({
        dbAbilities,
        isAbilitiesLoaded: true
      })
    })  
  }

  componentWillUnmount() {
    this.props.database.child('ability').off('value')
  }

  handleToggleAbilities() {
    this.setState({
      isShowEmptyAbilities: !this.state.isShowEmptyAbilities
    })
  }

  renderAttributes() {
    return attributes.map((group, groupIndex) => {
      const attributeCards = group.items.map((attribute, index) => {
        return (
          <AttributeCard 
            key={index} 
            title={attribute.name} 
            database={this.props.database} 
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
    if (!this.state.isAbilitiesLoaded) {
      return null
    }

    // Merge the arrays, and make it unique
    let renderAbilities = this.state.dbAbilities.concat(abilities)
    let passedFilter = new Set()

    renderAbilities = renderAbilities.filter((item) => {
      if (passedFilter.has(item.name)) {
        return false
      }

      passedFilter.add(item.name)
      return true
    })

    // Alphabetize the abilities
    renderAbilities = renderAbilities.sort((a, b) => {
      if ( a.name < b.name )
        return -1
      if ( a.name > b.name )
          return 1
      return 0
    })

    return renderAbilities.map((ability, index) => {
      return (
        <AbilityCard 
          key={index} 
          database={this.props.database} 
          showEmpty={this.state.isShowEmptyAbilities} 
          specialty={ability.specialty === true}
          title={ability.name}
        />
      )
    })
  }

  renderVirtues() {
    return <Text>Virtues here...</Text>
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
              <TouchableOpacity style={[styles.button, styles.titleBarButton]} onPress={this.handleToggleAbilities.bind(this)}>
                <Text>{this.state.isShowEmptyAbilities ? 'Hide' : 'Show'} Empty</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
              <View style={[styles.abilitiesContainer, this.state.smallScreen ? styles.smallScreen : {}]}>
                {this.renderAbilities()}
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Virtues</Text>
            </View>
            <View style={styles.additionalInfoContainer}>
              {this.renderVirtues()}
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Other</Text>
            </View>
            <View style={styles.additionalInfoContainer}>
              <LegendCard database={this.props.database} />
              <WillpowerCard database={this.props.database} />
              <ExperienceCard database={this.props.database} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
