import React from 'react-native';
import {
  StyleSheet,
  Dimensions
} from 'react-native'

var windowSize = Dimensions.get('window');
var FONT = 16;
var Margin = 8;
var height = windowSize.width / 1.3
var styles = StyleSheet.create({
  container: {
    marginTop: 3,
    flex: 1,
    backgroundColor: 'white'
  },
  letter: {
    fontSize: 60
  },
  body: {
    flex: 0.52,
  },
  bodyIphone5: {
    flex: 0.44
  },
  bodyAndroid: {
    flex: 0.46
  },
  bodyIphone6plus: {
    flex: 0.55
  },
  footerIphone5: {
    flex: 0.5,
    width: windowSize.width,
    height: windowSize.height
  },
  footerAndroid: {
    flex: 0.48,
    width: windowSize.width,
    height: windowSize.height
  },
  footerIphone6plus: {
    flex: 0.4,
    width: windowSize.width,
    height: windowSize.height
  },
  footer: {
    flex: 0.42,
    width: windowSize.width,
    height: windowSize.height
  },
  thumbnail: {
    height: 250
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row'
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
    flex: 1.5,
    flexDirection: 'row'
  },
  subRow: {
    marginLeft: 2.5,
    marginRight: 2,
    flex: 1.5,
    height: 40,
    padding: 5,
    borderRadius: 2,
    flex: 0.5,
    backgroundColor: '#495159'
  },
  subRow1: {
    marginLeft: 2.5,
    flex: 1.5,
    height: 40,
    padding: 5,
    borderRadius: 2,
    flex: 0.5,
    backgroundColor: '#27ae61'
  },
  Text: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
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
  Correct: {
    // flex: 0.20,
   
    fontWeight: 'bold',
    marginTop: 10,
    paddingLeft: 8
  },
  Level: {
    // flex: 0.40,
    
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  Time: {
    // flex: 0.40,
    
    fontWeight: 'bold',
    marginTop: 10
  },
  headerRow: {
    flex:1,
    paddingTop: 5,
    flexDirection: 'row',
    
  },
  subBody: {
    flex: 0.38,
    borderBottomColor: 'black',
  },
  subBodyIphone5: {
    flex: 0.30,
    borderBottomColor: 'black',
  },
  subBodyAndroid: {
    flex: 0.36,
    borderBottomColor: 'black',
  },
  subBodyIphone6plus: {
    flex: .45
  },
  subBodyText: {
    flex: .10
  },
  subBodyTextIphone5: {
    flex: .08
  },
  subBodyTextAndroid: {
    flex: .10
  },
  subBodyTextIphone6plus: {
    flex: .10
  },
  Input: {
    marginTop: 5,
    flexDirection: 'row',
    height: 40,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  InputIphone5: {
    marginTop: 2,
    flexDirection: 'row',
    height: 33,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  InputAndroid: {
    marginTop: 3,
    flexDirection: 'row',
    height: 45,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  TextInput: {
    padding: 5,
    flex: .15,
    fontSize: 30,
    justifyContent: 'center',
    color: 'black'
  },
  TextInputIphone5: {
    padding: 4,
    flex: .1,
    fontSize: 20,
    justifyContent: 'center',
    color: 'black'
  },
  TextInputAndroid: {
    padding: 4,
    flex: .1,
    fontSize: 20,
    justifyContent: 'center',
    color: 'black'
  },
  tile: {
     position: 'absolute',
    width:windowSize.width/4+2,
    height:height/3,
    borderRadius: 2,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2',
    
    
  },
  modal3: {
    height: 150,
    width: windowSize.width - 50
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlist:{
    flex:1,
    marginVertical:50,
    backgroundColor:"green",
    borderStartWidth:1,
    borderColor:'black',
   
    
  },
  tileText:{
    justifyContent:'center',
    textAlign:'center',
    fontSize:18,
    
    
  },
  map:{
    alignSelf:'stretch',

    height:100,
},
row1:{
    marginTop:70,
    alignSelf:'stretch',
    flexDirection:'row',
    justifyContent:'center'
},
row2:{
    marginTop:10,
    alignSelf:'stretch',
    flexDirection:'row',
    justifyContent:'center'
},
row3:{
    marginTop:10,
    alignSelf:'stretch',
    flexDirection:'row',
    justifyContent:'center'
},
cell:{
    maxWidth:90,
    borderWidth:1,
    borderColor:'darkgrey',
    flex:1,
    aspectRatio:1,
    margin:3
    
},
shadowProp: {
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
},

});
export default styles;