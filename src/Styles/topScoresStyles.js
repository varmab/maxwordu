import React from 'react';
var windowSize = Dimensions.get('window');
import {
  StyleSheet,
  Dimensions
} from 'react-native'


var FONT   = 0;

var Margin = 0;
if(windowSize.width>=350){
  FONT   = 20
  Margin = 28 
}else if(windowSize.width<350){
  FONT = 15
  Margin=15
}else{
  FONT=15
  Margin=18
}

var styles = StyleSheet.create({
container: {
    
    flex: 1,
    paddingHorizontal:0,
    width:'100%',
    marginHorizontal:0,
    backgroundColor:'white'
  },
  body:{
    flex:1,
    paddingHorizontal:0
  },
  footer:{
    height:'15%',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    paddingHorizontal:0,
    
  },
  row:{
    flex:1.5,
    flexDirection:'row',
    height:'70%',
    paddingHorizontal:0


  },
  subRow:{
    flex:0.35,
    backgroundColor:'#34475d',
    height:'70%',
    paddingHorizontal:0
  },
  subRow1:{
    flex:0.35,
    backgroundColor:'#27ae61',
    height:'70%',
    paddingHorizontal:0
  },
  Text:{
    textAlign:'center',
   marginTop:Margin,
    fontSize:FONT,
    fontWeight:'bold',
    color:'white',
    
  },
  ListContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'column',
    paddingHorizontal:0
  },
  subContainer:{
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:0
  },
  maxWordsText:{
    flex: .3,
    paddingTop:5,
    textAlign:'center',
    fontSize:13,
    fontWeight:'bold',
    color:'black'
  },
  LevelText:{
    flex: .3,
    paddingTop:5,
   textAlign:'center',
    fontSize:13,
    fontWeight:'bold',
    color:'#f89500'
  },
  ScoreText:{
    flex: .2,
    paddingTop:5,
  textAlign:'center',
    fontSize:13,
    fontWeight:'bold',
    color:'#f89500'
  },
  date:{
    flex: .2,
    paddingTop:5,
   textAlign:'center',
    fontSize:13,
    fontWeight:'bold',
    color:'#f89500'
  }
});

export default styles;