import React from 'react-native';
// var {
//   StyleSheet
// } = React;
// import Dimensions from 'Dimensions';
import {
  StyleSheet,
  Dimensions
} from 'react-native'
var windowSize = Dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    paddingTop: 63,
    flex: 1,
    backgroundColor:'white',
   
  },
  body:{
    flex:.75,
  },
  levelText:{
    textAlign:'center',
    paddingTop: 15,
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  modal3: {
    height: 100,
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
    justifyContent:'center',
   
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
    height: 100,
    color:'#ffffff',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:"white",
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:10, 
   marginLeft:'65%',
   marginRight:'5%',
   justifyContent:'center',
    textAlign:'center',
    borderColor:'black',
    borderWidth:1,
    shadowColor:'black',
  },
  
  green_column: {
    backgroundColor: 'green',
    height: 100,
    color:'#ffffff',
    fontSize:25,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:20,
    backgroundColor:"white",
    borderColor:'black',
    borderWidth:1,
    textTransform:"uppercase",
    marginTop:20,
    marginBottom:10,
   shadowColor:'black',
    marginRight:'65%',
    marginLeft:'5%',
    justifyContent:'center',
    textAlign:'center',
   
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent:'center',
    textAlign:'center',
  },
  
  row2_column1: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 1,
   
  },
  row2_column2: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
    flex: 1,
   
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default styles;