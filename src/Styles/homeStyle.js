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

  button:{
    flex: 1,
    flexDirection: 'row',
    position:'absolute',
    justifyContent:'center',
    bottom:20,
    left:'50%',
    transform:[
    {translateX:'-50%'}]
    
  },
  
  text_button:{
    fontWeight:'bold',
    color:'white'

    
  
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
});
export default styles;