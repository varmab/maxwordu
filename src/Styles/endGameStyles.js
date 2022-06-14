import React from 'react-native';
import {
  StyleSheet,
  Dimensions
} from 'react-native'
var windowSize = Dimensions.get('window').width;
console.log(windowSize,'size');
var FONT   = 0;
var textFont = 0;
var Margin = 0;
if(windowSize>350){
  FONT   = 20
  Margin = 38
  textFont=20
}else if(windowSize<350){
  FONT = 15
  Margin=18
  textFont=12.5
}else{
  FONT=15
  Margin=18
}
var styles = StyleSheet.create({
container: {
    // marginTop: 63,
    flex: 1,
    backgroundColor:'white'
  },
  header: {
    flex:0.25
  },
  body:{
    flex:.5,
  },
  subBody:{
    flex:.5,
  },
  footer:{
 
    height:'19%',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    top:70
   
    
  },
  row:{
    flex:1.5,
    flexDirection:'row'
  },
  subRow:{
    flex:0.35,
    backgroundColor:'#34475d',
    height:'70%'
  },
  subRow1:{
    flex:0.35,
    backgroundColor:'#27ae61',
    height:'70%'
  },
  Text:{
    textAlign:'center',
    marginTop:Margin,
    fontSize:FONT,
    fontWeight:'bold',
    color:'white'
  },
  gameOver:{
    textAlign:'center',
    paddingTop: 20,
    fontSize:25,
    fontWeight:'bold'
  },
  Score:{
    textAlign:'center',
    marginTop: 10,
    fontSize:18,
    fontWeight:'bold'
  },
  Level:{
    marginTop:8,
    fontSize:textFont,
    fontStyle:'italic',
    color:'#4B4C4D',
    marginLeft:'45%',
    marginRight:'45%'
  },
  Time:{
    marginTop:8,
    textAlign:'center',
    fontSize:textFont,
    fontStyle:'italic',
    color:'#4B4C4D',
   
  },
  Correct:{
    fontSize:textFont,
   fontStyle:'italic',
   color:'#4B4C4D',
   marginLeft:'45%',
   marginRight:'45%'
  },
  Incorrect:{
   textAlign:'center',
    fontSize:textFont,
    fontStyle:'italic',
    color:'#4B4C4D',
    
  },
  correctWords:{
    fontSize:17,
    textAlign:'center',
    color:'blue'
  }
});

export default styles;