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
    height:'25%',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    marginBottom:10,
    backgroundColor:'white'
  },
  row:{
    flex:1,
    flexDirection:'vertical'
  },
  subRow:{
   
    color:'white',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:'#34475d',
    textTransform:"uppercase",
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
  },
  subRow1:{
    color:'white',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:'#27ae61',
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
  },
  Text:{
    fontWeight:'bold',
    color:'white',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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