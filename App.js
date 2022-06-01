
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './src/MainStack';
import { Provider as PaperProvider } from 'react-native-paper';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <PaperProvider>
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
    </PaperProvider>
  );
};
export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  */
//  'use strict';

//  import React from 'react';
//  import Main from './src/components/Main';
// //  import Main from './App/Components/Home';
// //  import dismissKeyboard from 'dismissKeyboard';
// //  import DeviceInfo from 'react-native-device-info';
// //  import Dimensions from 'Dimensions';
// //  import styles from './App/Styles/mainStyle'
//  import {
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   TouchableHighlight,
//   Alert,
//   ScrollView,
//   Dimensions
// } from 'react-native'
//  var windowSize = Dimensions.get('window');
//  var {
//    AppRegistry,
//    Navigator
//  } = React;
// //  var FONT   = 20;
// //  if(windowSize.height == 568){
// //    var FONT = 18;
// //  }
// //  var arrow = '< Back'
// //  var NavigationBarRouteMapper = {
// //    LeftButton(route, navigator, index, navState){
// //      if(index > 0){
// //        return(
// //          <TouchableHighlight style={{marginTop: 10}} onPress={() =>{
// //            if(route.name == 'End Game'){
// //              dismissKeyboard();
// //              navigator.popToTop();
// //            }
// //            else if(index > 0){
// //              dismissKeyboard();
// //              navigator.pop();
// //            }
// //          }}>
// //          <Text allowFontScaling={false} style={styles.arrow}>{arrow}</Text>
// //          </TouchableHighlight>
// //          )
// //      }else{
// //        return null
// //      }
// //    },
// //    RightButton(route, navigator, index, navState){
// //      if(route.name == 'Play Now'){
// //      return(
// //        <View style={{marginTop:10}}>
// //          <Text allowFontScaling={false} style={{marginTop:5,fontSize:20,marginRight:5,color:'white'}}>v 1.1</Text>
// //        </View>
// //        )
// //    }
// //    },
// //    Title(route, navigator, index, navState){
// //      return <Text allowFontScaling={false} style={styles.navBarTitle}>{route.title}</Text>
// //    }
// //  }
 
//  class MaxWords extends React.Component {
//    render() {
//     // alert("height:"+windowSize.height)
//        return (
//          <Navigator
//         style={{flex:1}}
//         initialRoute={{title: 'MaxWord',name:'Main', component: Main, index:0}}
//         renderScene={(route, navigator) => {
//          if(route.component){
//            return React.createElement(route.component, {...this.props, ...route.passProps, navigator, route});
//          }
//         }}
//         navigationBar = {<Navigator.NavigationBar routeMapper={NavigationBarRouteMapper} style={styles.navBar}/>}/>
//        )
//    }
//  };
 
//  AppRegistry.registerComponent('MaxWords', () => MaxWords);
 