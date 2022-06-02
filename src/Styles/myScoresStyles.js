import React from 'react-native';
import {
  StyleSheet,
  Dimensions
} from 'react-native'
var windowSize = Dimensions.get('window');

var FONT   = 0;
var Margin = 0;
if(windowSize.width>=350){
  FONT   = 20
  Margin = 30
}else if(windowSize.width<350){
  FONT = 13
  Margin=18
}else{
  FONT=15
  Margin=18
}

var styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
    backgroundColor: 'white'
  },
  body: {
    flex: 0.85,
  },
  footer: {
   
    height:'15%',
    justifyContent:'center',
    alignItems:'center',
    
    
    marginBottom:0,
  },
  thumbnail: {
    height: 250,
  },
  title: {
    fontSize: 20,
    marginTop: 8,
  },
  year: {
    marginTop: 12,
    marginLeft: 8,
  },
  row: {
    flex: 1,
    width:'15%',
    flexDirection: 'row'
  },
  subRow: {
    width:'50%',
    backgroundColor: '#34475d',
    height:'70%',
    marginLeft:'15%',
    marginRight:'10%',
    borderRadius:20
  },
  subRow1: {
    width:'50%',
    backgroundColor: '#27ae61',
    height:'70%',
    borderRadius:20
  },
  Text: {
    textAlign: 'center',
    marginTop: Margin,
    fontSize: FONT,
    fontWeight: 'bold',
    color: 'white',
    
  },
  textHeader: {
    paddingTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textBody: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 17
  },
  textfooter: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 17
  },
  subRow3: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  mainText: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  days: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
  contactsText: {
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 15,
  },
  list: {
    flex: .05,
  },
  ListView: {
    fontSize: 17,
    textAlign: 'center',
    color: 'blue'
  },
  ListContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 20,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flex:1
  },
  subContainer: {
    flex: 1.2,
    flexDirection: 'column'
  },
  subContainer1: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  subContainer2: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:'red',
    alignItems:'center'
  },
  maxWordsText: {
    flex: 0.5,
    paddingLeft: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  LevelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f89500'
  },
  date: {
    paddingTop: 7,
    flex: .25,
    fontSize: 11,
  },
  correctText: {
    paddingTop: 20,
    flex: 0.25,
    fontSize: 12,
    color: '#f89500',
    fontWeight: 'bold',

  },
  IncorrectText: {
    paddingTop: 7,
    flex: .25,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f89500'
  }
});

export default styles;