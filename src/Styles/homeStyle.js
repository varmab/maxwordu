import React from 'react-native';
import {
  StyleSheet,
  Dimensions,

} from 'react-native'

var windowSize = Dimensions.get('window');
console.log(windowSize,'size');
var FONT   = 0;
var font = 0;
var Margin = 0;
if(windowSize.width>=350){
  FONT   = 20
  Margin = 38
}else if(windowSize.width<350){
  FONT = 15
  Margin=18
}else{
  FONT=15
  Margin=18
}
var styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor:"white"
   
  },
  body:{
    flex:.30,
  },
  footer:{
    height:'20%',
    justifyContent:'center',
    alignItems:'center',
    position:'relative',
    top:50
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
  imageBody:{
    flex:.3,
    paddingTop:20,
  },
  logo:{
    flex:.80,
    resizeMode: 'contain',
    alignSelf:'center',
    width:100,
    height:100
  },
  left:{
    flex:.10
  },
  right:{
    flex:.10
  },
  imagerow:{
    flexDirection:'row'
  },
  modal3: {
    height: windowSize.height/2,
    width: windowSize.width-50
  },
  textInput:{
     height: 45,
     paddingLeft:8,
     marginTop:25,
     marginLeft:20,
     marginRight:20,
     fontSize: 15,
     borderWidth: 1,
     borderColor: '#9c9c9c',
     borderRadius: 5,
     color: 'black',
     backgroundColor:'white'
  },
  version_text:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:FONT,
    color:'#B2BEB5'

  },
  play:{
    color:'#ffffff',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:"#BB2CD9",
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:10,
},
options:{
    color:'#ffffff',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:"#BB2CD9",
    textTransform:"uppercase",
    marginTop:10,
    marginBottom:10,
},
help:{
    color:'#ffffff',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:"#BB2CD9",
    textTransform:"uppercase",
    marginTop:10,
    
},
shadowProp: {
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
});
export default styles;