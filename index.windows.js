// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  ScrollView,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight
} from 'react-native'
import AttributeGroup from './components/AttributeGroup.js'
import AttributeCard from './components/attributeCard.js'

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

class scion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
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

  render() {
    const routes = [
      {title: 'Home', index: 0},
      {title: 'Attributes', index: 1},
    ];
    
    return (
      <View>
        <View style={styles.attributesContainer}>
          {this.renderAttributes()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  attributesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  attributeGroup: {
    flex: .333,
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('scion', () => scion);