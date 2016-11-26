import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  mainContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingBottom: 20,
    marginBottom: 50
  },
  mainContent: {
    paddingBottom: 20
  },
  container: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  tabButton: {
    color: '#aaaaaa',
    textAlign: 'center'
  },
  activeTab: {
    color: 'white'
  },
  tabIcon: {
    height: 24,
    width: 24,
    justifyContent: 'center'
  },
  tabSelectedCharacter: {
    fontWeight: 'bold'
  },
  titleContainer: {
    backgroundColor: 'aliceblue',
    paddingVertical: 4,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left'
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 240
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  centerContainer: {
    alignItems: 'center'
  },
  boonsKnacksContainer: {
    flexDirection: 'row'
  },
  weaponArmorContainer: {
    flexDirection: 'column'
  },
  splitContainer: {
    flex: .5
  },
  characterPageContainer: {
    width: 300,
    marginBottom: 20,
    alignSelf: 'center'
  },
  column: {
    paddingHorizontal: 12
  },
  cardContainer: {
    margin: 8,
    padding: 8,
    width: 280,
    borderWidth: 2,
    borderColor: 'lightblue',
    borderRadius: 4
  },
  descriptionContainer: {
    borderTopWidth: 1,
    marginTop: 4,
    paddingTop: 4
  },
  controlContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 4,
    right: 4
  },
  onlineStatusContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  controlItem: {
    padding: 2,
    marginHorizontal: 4,
    width: 16,
    height: 16,
    backgroundColor: 'lightgrey'
  },
  controlIcon: {
    height: 12,
    width: 12
  },
  controlText: {
    fontSize: 12,
    textAlign: 'center'
  },
  smallScreen: {
    height: null
  },
  button: {
    borderWidth: 1,
    backgroundColor: 'darkgrey',
    padding: 4
  },
  titleBarButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  addBirthrightButton: {
    width: 200,
    alignSelf: 'flex-end'
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  },
  label: {
    flex: .3
  },
  input: {
    flex: .7
  },
  cardInput: {
    width: 60,
    marginTop: -4,
    marginHorizontal: 8
  },
  warnInput: {
    borderColor: 'orange'
  },
  errorInput: {
    borderColor: 'red'
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    //backgroundColor: 'black',
    opacity: .5
  },
  modal: {
    top: 100,
    width: 500,
    padding: 20,
    backgroundColor: 'aliceblue',
    borderWidth: 2,
    borderRadius: 10,
  },
  goodText: {
    color: 'green'
  },
  warningText: {
    color: 'red'
  }
})