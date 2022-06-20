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
var Height=0
if(windowSize>450){
  FONT   = 18
  Margin = 38
  textFont=20
  Height=130
}else if(windowSize<450){
  FONT = 12
  Margin=18
  textFont=12.5
  Height=160
}else{
  FONT=12
  Margin=18
  Height=130
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
    height:'25%',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    marginBottom:20
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
  gameOver:{
    textAlign:'center',
    paddingTop: 20,
    fontSize:22,
    fontWeight:'bold'
  },
  Score:{
    
    fontSize:FONT,
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
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  row1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    textAlign:'center',
    width: '100%',
    justifyContent:'center'
  },
  
  row1_column1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    textAlign:'center',
    flex: 1,
    
   
  },
  row1_column2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    textAlign:'center',
    flex: 1,
    
   
  },
  blue_column: {
    backgroundColor: 'blue',
    height: Height,
    color:'#ffffff',
    borderRadius:20,
    backgroundColor:"white",
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:10, 
   justifyContent:'center',
    textAlign:'center',
    borderColor:'black',
    borderWidth:1,
    shadowColor:'black',
  },
  
  green_column: {
    backgroundColor: 'green',
    height: Height,
    color:'#ffffff',
    borderRadius:20,
    backgroundColor:"white",
    borderColor:'black',
    borderWidth:1,
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:10,
    shadowColor:'black',
    justifyContent:'center',
    textAlign:'center',
   
  },
});

export default styles;