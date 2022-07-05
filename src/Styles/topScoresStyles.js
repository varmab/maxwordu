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
    height:120,
    backgroundColor:'white',
    width:'100%',
    borderTopWidth:1
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
    
    paddingBottom: 10,
    flexDirection: 'column',
   
  },
  subContainer:{
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:0,
    justifyContent:'center',
    alignItems:'center'
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
  },
  buttonGrad: {
    height: 100,
    width: 100,
    borderRadius: 35,
    position: 'absolute',
    bottom: 6,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonParent: {
    height: 100,
    width: 100,
    borderRadius: 35,
    backgroundColor: '#222222',
  },
  text_button:{
    fontWeight:'bold',
    color:'white'
  },
  button:{
    flex: 1,
    flexDirection: 'row',
    position:'absolute',
    justifyContent:'center',
    bottom:10,
    left:'50%',
    transform:[
    {translateX:'-50%'}]
    
  },
});

export default styles;