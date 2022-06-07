// import React from 'react-native';
// import Play from  './Play';
// import Modal from 'react-native-modalbox';
// import DeviceInfo from 'react-native-device-info';
// // import dismissKeyboard from 'dismissKeyboard';
// import {
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   TouchableHighlight,
//   Alert,
//   ScrollView,
//   Dimensions,TouchableWithoutFeedback,
//   Linking,AppRegistry
// } from 'react-native'
// import gameDay from './gameDay';

// // import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';
// // import moment from 'moment';
// // import styles from './../Styles/optionsStyles';
// // const {
// //   AppRegistry,
// //   LinkingIOS,
// //   TouchableWithoutFeedback,
// // } = React;

// // import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// // let tracker = new GoogleAnalyticsTracker('UA-86654723-1');

// // tracker.trackScreenView('Options');
// var FONT   = 17;
// var Margin = 38;
// var textFont = 20
// var height = 80
// if(windowSize.width == 768){
//   FONT   = 30,
//   Margin = 50,
//   textFont = 20
//   height = 120
// }else if(windowSize.width == 320){
//   textFont:18
//   height = 60

// }
// var windowSize = Dimensions.get('window');
// class Options extends React.Component {
//   constructor(){
//     super();
//     this.state = {Level:"Beginner",Name:"",
//     City:"",uuid:'',Show:false,
//     layer:false
//     };
//   }
//   handleChange(name,e){
//     if(name == 'Name'){
//       AsyncStorage.setItem("Name", e.nativeEvent.text)
//        this.setState({
//          Name: e.nativeEvent.text
//        })
//     }else{
//        AsyncStorage.setItem("City", e.nativeEvent.text)
//        this.setState({
//          City: e.nativeEvent.text
//        })
//     }
//   }
//   componentWillMount() {
//     AsyncStorage.getItem("Name").then((value) =>{
//       this.setState({"Name":value})
//     }).done();
//     AsyncStorage.getItem("City").then((value) =>{
//       this.setState({"City":value})
//     }).done();
//     AsyncStorage.getItem("Level").then((value) =>{
//       this.setState({"Level":value})
//     }).done();
//      AsyncStorage.getItem("uuid").then((value) =>{
//         this.setState({
//           uuid:value
//         })
//     }).done();
//   }
//   componentDidMount(){
//     AdMobInterstitial.setTestDeviceID('EMULATOR');
//     AdMobInterstitial.setAdUnitID('ca-app-pub-7238183882077023/7178259794');

//     AdMobInterstitial.addEventListener('interstitialDidLoad',
//       () => console.log('interstitialDidLoad event'));
//     AdMobInterstitial.addEventListener('interstitialDidClose',
//       this.interstitialDidClose);
//     AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
//       () => console.log('interstitialDidFailToLoad event'));
//     AdMobInterstitial.addEventListener('interstitialDidOpen',
//       () => console.log('interstitialDidOpen event'));
//     AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
//       () => console.log('interstitalWillLeaveApplication event'));

//     AdMobInterstitial.requestAd((error) => error && console.log(error));
//   }
//   model(id){
//     this.refs.modal3.open();
//   }
//   onOk(){
//     this.refs.modal3.close();
//   }
//   model1(id){
//     this.refs.modal4.open();
//   }
//   play(){
//     if(this.state.uuid == null || this.state.uuid == "null" || this.state.uuid == ""){
//       this.setState({Show:true})
//     }
//     else if(this.state.Name == null || this.state.Name == "null" || this.state.Name == "" || this.state.City == null || this.state.City == "null" || this.state.City == ""){
//       this.model()
//     }else{
//      var Level = this.state.Level
//       var Name  = this.state.Name
//       var City = this.state.City
//       this.props.navigator.push({
//         name:'Play Now',
//         component: Play,
//         title: 'MaxWord',
//         passProps:{Level:Level,Name:Name,City:City}
//       });
//     }
//   }
//   home(){
//     // var Home = require('./Home');
//     this.props.navigator.replacePreviousAndPop({
//       component:Home,
//       title: 'MaxWord',
//     })
//   }
//   close(){
//    var self = this
//     if(this.state.Name == null || this.state.Name == "null" || this.state.Name == ''){
//       Alert.alert('MaxWord','Please enter name',[{text:'OK'}]);
//     }else if(this.state.City == null || this.state.City == "null" || this.state.City == ""){
//       Alert.alert('MaxWord','Please enter city',[{text:'OK'}]);
//     }else{
//       AsyncStorage.setItem("uuid", DeviceInfo.getUniqueID())
//       this.setState({
//         uuid:DeviceInfo.getUniqueID(),
//         Show:false
//       },()=>{
//         var Level = self.state.Level
//         var Name  = self.state.Name
//         var City = self.state.City
//         this.props.navigator.push({
//           name:'Play Now',
//           component: Play,
//           title: 'MaxWord',
//           passProps:{Level:Level,Name:Name,City:City}
//         });
//       })
//     }
//   }
//   inputFocused (refName) {
//     if(refName == 'Name'){
//       let scrollResponder = this.refs.scrollView.getScrollResponder();
//       scrollResponder.scrollTo({y: windowSize.height/3})
//     }else{
//       let scrollResponder = this.refs.scrollView.getScrollResponder();
//       scrollResponder.scrollTo({y: windowSize.height/2.3})
//     }
//   }
//   gameDay(){
//      var name = this.state.Name
//      var gameDate = moment().format('YYYY-MM-DD')
//     if(this.state.uuid == null || this.state.uuid == "null" || this.state.uuid == ""){
//       this.setState({Show:true})
//     }
//     else if(this.state.Name == null || this.state.Name == "null" || this.state.Name == "" || this.state.City == null || this.state.City == "null" || this.state.City == ""){
//       this.model()
//     }else{
//       this.setState({layer:true})
//       fetch('https://maxwords.herokuapp.com/api/gameOfTheDay', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({'udId':this.state.uuid,'name':name,"gameDate":gameDate})
//     }).then((response) => response.json()).then((responseData) => {
//        this.setState({layer:false})
//        if(responseData.status == "Success"){
//         if(responseData.message == 'Game does not exist'){
//           Alert.alert('MaxWord','Game does not exist',[{text:'OK'}]);
//         }else if(responseData.message == 'Already played'){
//           Alert.alert('MaxWord','Already played',[{text:'OK'}]);
//         }else{
//           var gameWord = responseData.message.gameWord
//           this.props.navigator.push({
//             component: gameDay,
//             title: 'MaxWord',
//             passProps:{Level:'gameDay',Name:name,City:this.state.City,gameWord:gameWord}
//           });
//         }
//        }
//       })
//     }
//   }
//   select(value){
//     AsyncStorage.setItem("Level", value)
//     this.setState({
//         Level:value,
//       });
//   }

//   render() {
//     const options = [
//       "Beginner",
//       "Intermediate",
//       "Advanced",
//     ];
//      if(this.state.Show){
//     return(
//       <View style={{flex:1,marginTop:64}}>
//          {/* <ScrollView ref='scrollView' automaticallyAdjustContentInsets={false}>
//             <View>
//               <Text allowFontScaling={false} style={{marginTop:20,marginLeft:20,marginRight:20,fontSize:20}}>
//               To play, simply tap on available letters to form words before the tiles fill up. If the word is correct, the letters disappear. A letter can be used more than once, and longer words score higher; “BANANA” scores higher than “BAN”. After all the tiles are filled, you have a few seconds to submit a word or the game ends. There are three levels of play to choose from. Name and City is requested for the leaderboard.
//               </Text>
//               <View>
//                 <Text allowFontScaling={false} style={{textAlign:'center',marginTop:15,fontSize:17,fontWeight:'bold',color:'black'}}>Enter your name :</Text>
//               </View>
//               <TextInput
//                 allowFontScaling={false}
//                 style={styles.textInput}
//                 placeholder="Name"
//                 value={this.state.Name}
//                 returnKeyType='next'
//                  onFocus={this.inputFocused.bind(this, 'Name')}
//                  onSubmitEditing={(event)=>{
//                     this.refs.SecondInput.focus();
//                   }}
//                 onChange={this.handleChange.bind(this,'Name')}/>
//                 <View>
//                 <Text allowFontScaling={false} style={{textAlign:'center',marginTop:15,fontSize:17,fontWeight:'bold',color:'black'}}>Enter your city :</Text>
//                 </View>
//                 <TextInput
//                   ref='SecondInput'
//                   allowFontScaling={false}
//                   style={styles.textInput}
//                   placeholder="City"
//                   value={this.state.City}
//                   returnKeyType='done'
//                   onFocus={this.inputFocused.bind(this, 'City')}
//                   onSubmitEditing={(event)=>{
//                     this.close();
//                     }}
//                   onChange={this.handleChange.bind(this,'City')}/>
//                   <TouchableOpacity onPress={this.close.bind(this)} style={{height:40,marginTop:30,marginLeft:windowSize.width/4,marginRight:windowSize.width/4,backgroundColor:'#27ae61',marginBottom:30}}>
//                     <Text allowFontScaling={false} style={{textAlign:'center',fontSize:25,marginTop:6,color:'white'}}>OK</Text>
//                   </TouchableOpacity>
//                 </View>
//           </ScrollView> */}
//       </View>
//     )
//    }else{
//     return (
//       <View style={styles.container}>
//           {/* <View style={styles.body}>
//             <View style={{height:60,width:windowSize.width}}>
//               <View style={{flex:1,flexDirection:'row'}}>
//                 <View style={{width:windowSize.width/2}}>
//                   <View style={{flex:1,justifyContent:'center'}}>
//                     <Text allowFontScaling={false} style={{fontSize:textFont,marginLeft:10,fontWeight:'bold'}}>Enter Your Name:</Text>
//                   </View>
//                 </View>
//                 <View style={{width:windowSize.width/2}}>
//                   <View style={{flex:1}}>
//                     <TextInput
//                      style={{height:60,width:windowSize.width/2,marginLeft:10,fontSize: textFont,justifyContent:'center',color: 'black'}}
//                      value={this.state.Name}
//                      placeholder="Name"
//                      returnKeyType='next'
//                      onSubmitEditing={(event)=>{
//                         this.refs.SecondInput.focus();
//                       }}
//                      onChange={this.handleChange.bind(this,'Name')}/>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={{height:1,backgroundColor:'black',marginLeft:10,marginRight:10}}></View>
//             <View style={{height:60,width:windowSize.width}}>
//               <View style={{flex:1,flexDirection:'row'}}>
//                 <View style={{width:windowSize.width/2}}>
//                   <View style={{flex:1,justifyContent:'center'}}>
//                     <Text allowFontScaling={false} style={{fontSize:textFont,marginLeft:10,fontWeight:'bold'}}>Enter Your City:</Text>
//                   </View>
//                 </View>
//                 <View style={{width:windowSize.width/2}}>
//                   <View style={{flex:1}}>
//                     <TextInput
//                     ref='SecondInput'
//                      style={{height:60,width:windowSize.width/2,marginLeft:10,fontSize: textFont,justifyContent:'center',color: 'black'}}
//                      value={this.state.City}
//                      returnKeyType='done'
//                      placeholder="City"
//                      onSubmitEditing={(event)=>{
//                       dismissKeyboard();
//                       }}
//                      onChange={this.handleChange.bind(this,'City')}/>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={{height:1,backgroundColor:'black',marginLeft:10,marginRight:10}}></View>
//             <View>
//               <Text allowFontScaling={false} style={styles.levelText}>Choose level:</Text>
//               <View style={{height:1,backgroundColor:'black'}}></View>
//               <View style={{height:80}}>
//                 <View style={{flex:1,flexDirection:'row'}}>
//                   <TouchableOpacity style={{width:windowSize.width/4}} onPress={this.select.bind(this,'Beginner')}>
//                     <View style={{flex:1,flexDirection:'row'}}>
//                     <View style={{flex:1,flexDirection:'column'}}>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       <Text allowFontScaling={false} style={{fontSize:12}}>Beginner</Text>
//                     </View>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                     {this.state.Level == 'Beginner' ? (
//                       <Image style={{height:30,width:30}}  source={require('image!check')} />
//                       ):(<View></View>)}
//                     </View>
//                     </View>
//                     <View style={{height:80,width:1,backgroundColor:'black'}}></View>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={{width:windowSize.width/4}} onPress={this.select.bind(this,'Intermediate')}>
//                     <View style={{flex:1,flexDirection:'row'}}>
//                     <View style={{flex:1,flexDirection:'column'}}>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       <Text allowFontScaling={false} style={{fontSize:12}}>Intermediate</Text>
//                     </View>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       {this.state.Level == 'Intermediate' ? (
//                       <Image style={{height:30,width:30}}  source={require('image!check')} />
//                       ):(<View></View>)}
//                     </View>
//                     </View>
//                     <View style={{height:80,width:1,backgroundColor:'black'}}></View>
//                     </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={{width:windowSize.width/4,height:80}} onPress={this.select.bind(this,'Advanced')}>
//                     <View style={{flex:1,flexDirection:'row'}}>
//                     <View style={{flex:1,flexDirection:'column'}}>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       <Text allowFontScaling={false} style={{fontSize:12}}>Advanced</Text>
//                     </View>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       {this.state.Level == 'Advanced' ? (
//                       <Image style={{height:30,width:30}}  source={require('image!check')} />
//                       ):(<View></View>)}
//                     </View>
//                     </View>
//                     <View style={{height:80,width:1,backgroundColor:'black'}}></View>
//                      </View>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={{width:windowSize.width/4}} onPress={this.select.bind(this,'Pro')}>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       <Text allowFontScaling={false} style={{fontSize:12}}>Pro</Text>
//                     </View>
//                     <View style={{width:windowSize.width/4,height:40,justifyContent:'center',alignItems:'center'}}>
//                       {this.state.Level == 'Pro' ? (
//                       <Image style={{height:30,width:30}}  source={require('image!check')} />
//                       ):(<View></View>)}
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <View style={{height:1,width:windowSize.width,backgroundColor:'black'}}></View>
//             </View>

//           </View> */}
//           {/* <View style={{height:height,width:windowSize.width}}>
//             <View style={{flex:1,flexDirection:'row'}}>
//               <TouchableOpacity onPress={this.play.bind(this)} style={{width:windowSize.width/2,height:height,backgroundColor:'#27ae61'}}>
//                 <View style={{flex:1,justifyContent:'center'}}>
//                   <Text allowFontScaling={false} style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:FONT}}>Play Now</Text>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={this.home.bind(this)} style={{width:windowSize.width/2,height:height,backgroundColor:'#34475d'}}>
//                 <View style={{flex:1,justifyContent:'center'}}>
//                   <Text allowFontScaling={false} style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:FONT}}>Home</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View> */}

//           {/* <View style={{marginTop:3}}>
//             <AdMobBanner
//               bannerSize={this.state.bannerSize}
//               testDeviceID="EMULATOR"
//               adUnitID="ca-app-pub-7238183882077023/7178259794"/>
//           </View> */}
//           {/* <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} backdropPressToClose={false}>
//             <View style={{flex:1,width:windowSize.width-50}}>
//               <View style={{flex:0.7,justifyContent:'center',alignSelf:'center'}}>
//                <View>
//                {this.state.Name == null || this.state.Name == "null" || this.state.Name == "" && this.state.City == null || this.state.City == "null" || this.state.City == "" ?(
//                 <Text allowFontScaling={false} style={{textAlign:'center',fontSize:17}}>Please Enter Name and City</Text>
//                 ):this.state.Name == null || this.state.Name == "null" || this.state.Name == "" ? (
//                 <Text allowFontScaling={false} style={{textAlign:'center',fontSize:17}}>Please Enter Name</Text>
//                 ):this.state.City == null || this.state.City == "null" || this.state.City == "" ? (
//                 <Text allowFontScaling={false} style={{textAlign:'center',fontSize:17}}>Please Enter City</Text>
//                 ):<View></View>}
//                </View>
//               </View>
//               <View style={{flex:0.3,backgroundColor:'#013369',justifyContent:"center"}}>
//                 <TouchableOpacity onPress={this.onOk.bind(this)}>
//                   <View style={{justifyContent:'center',alignSelf:'center'}}>
//                     <Text allowFontScaling={false} style={{color:'white',textAlign:'center'}}>OK</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal> */}
//         </View>
//         );
//     }
//   }
// }
// module.exports = Options

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { Component } from "react";
import { Card, TextInput } from "react-native-paper";
import Header from "./Header";
import Modal from "react-native-modalbox";
import styles from "./../Styles/optionsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUniqueId, getManufacturer } from "react-native-device-info";
var windowSize = Dimensions.get("window");

const { width } = Dimensions.get("window");
var FONT = 17;
var Margin = 38;
var textFont = 20;
var height = 80;
if (windowSize.width == 768) {
  (FONT = 30), (Margin = 50), (textFont = 20);
  height = 120;
} else if (windowSize.width == 320) {
  textFont: 18;
  height = 60;
}
export default class Options extends Component {
  constructor() {
    super();
    this.state = {
      Level: "Beginner",
      Name: "",
      City: "",
      uuid: "",
      Show: false,
      layer: false,
    };
    this.refs = React.createRef();
  }

  close() {
    var self = this;
    if (
      this.state.Name == null ||
      this.state.Name == "null" ||
      this.state.Name == ""
    ) {
      Alert.alert("MaxWord", "Please enter name", [{ text: "OK" }]);
    } else if (
      this.state.City == null ||
      this.state.City == "null" ||
      this.state.City == ""
    ) {
      Alert.alert("MaxWord", "Please enter city", [{ text: "OK" }]);
    } else {
      AsyncStorage.setItem("uuid", getUniqueId());
      this.setState(
        {
          uuid: getUniqueId(),
          Show: false,
        },
        () => {
          var Level = self.state.Level;
          var Name = self.state.Name;
          var City = self.state.City;
          // this.props.navigator.push({
          //   name: 'Play Now',
          //   component: Play,
          //   title: 'MaxWord',
          //   passProps: { Level: Level, Name: Name, City: City }
          // });
          this.props.navigation.replace("PlayNow", {
            Level: Level,
            Name: Name,
            City: City,
          });
        }
      );
    }
  }

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem("Name").then((value) => {
      this.setState({ Name: value });
    });
    AsyncStorage.getItem("City").then((value) => {
      this.setState({ City: value });
    });
    AsyncStorage.getItem("Level").then((value) => {
      this.setState({ Level: value });
    });
    AsyncStorage.getItem("uuid").then((value) => {
      this.setState({
        uuid: value,
      });
    });
  }

  inputFocused(refName) {
    if (refName == "Name") {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollTo({ y: windowSize.height / 3 });
    } else {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollTo({ y: windowSize.height / 2.3 });
    }
  }

  handleChange(name, e) {
    if (name == "Name") {
      AsyncStorage.setItem("Name", e.nativeEvent.text);
      this.setState({
        Name: e.nativeEvent.text,
      });
    } else {
      AsyncStorage.setItem("City", e.nativeEvent.text);
      this.setState({
        City: e.nativeEvent.text,
      });
    }
  }

  select(value) {
    AsyncStorage.setItem("Level", value);
    this.setState({
      Level: value,
    });
  }

  play() {
    if (
      this.state.uuid == null ||
      this.state.uuid == "null" ||
      this.state.uuid == ""
    ) {
      this.setState({ Show: true });
    } else if (
      this.state.Name == null ||
      this.state.Name == "null" ||
      this.state.Name == "" ||
      this.state.City == null ||
      this.state.City == "null" ||
      this.state.City == ""
    ) {
      this.model();
    } else {
      var Level = this.state.Level;
      var Name = this.state.Name;
      var City = this.state.City;
      this.props.navigation.replace("PlayNow");
      // this.props.navigator.push({
      //   name: 'Play Now',
      //   component: Play,
      //   title: 'MaxWord',
      //   passProps: { Level: Level, Name: Name, City: City }
      // });
    }
  }
  home() {
    this.props.navigation.navigate("Main");
    // var Home = require('./Home');
    // this.props.navigator.replacePreviousAndPop({
    //   component: Home,
    //   title: 'MaxWord',
    // })
  }
  model(id) {
    this.refs.modal3.open();
  }
  onOk() {
    this.refs.modal3.close();
  }

  gameDay() {
    var name = this.state.Name;
    var gameDate = moment().format("YYYY-MM-DD");
    if (
      this.state.uuid == null ||
      this.state.uuid == "null" ||
      this.state.uuid == ""
    ) {
      this.setState({ Show: true });
    } else if (
      this.state.Name == null ||
      this.state.Name == "null" ||
      this.state.Name == "" ||
      this.state.City == null ||
      this.state.City == "null" ||
      this.state.City == ""
    ) {
      this.model();
    } else {
      this.setState({ layer: true });
      fetch("http://www.maxword.net/api/api/gameOfTheDay", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          udId: this.state.uuid,
          name: name,
          gameDate: gameDate,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({ layer: false });
          if (responseData.status == "Success") {
            if (responseData.message == "Game does not exist") {
              Alert.alert("MaxWord", "Game does not exist", [{ text: "OK" }]);
            } else if (responseData.message == "Already played") {
              Alert.alert("MaxWord", "Already played", [{ text: "OK" }]);
            } else {
              var gameWord = responseData.message.gameWord;
              this.props.navigator.push({
                component: gameDay,
                title: "MaxWord",
                passProps: {
                  Level: "gameDay",
                  Name: name,
                  City: this.state.City,
                  gameWord: gameWord,
                },
              });
            }
          }
        });
    }
  }
  render() {
    const options = ["Beginner", "Intermediate", "Advanced"];
    return (
      <Card style={{ flex: 1 }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={"Options"}
        />
        {this.state.Show ? (
          <View style={{ flex: 1, marginTop: 64 }}>
            <ScrollView
              ref="scrollView"
              automaticallyAdjustContentInsets={false}
            >
              <View>
                <Text
                  allowFontScaling={false}
                  style={{
                    marginTop: 20,
                    marginLeft: 20,
                    marginRight: 20,
                    fontSize: 20,
                  }}
                >
                  To play, simply tap on available letters to form words before
                  the tiles fill up. If the word is correct, the letters
                  disappear. A letter can be used more than once, and longer
                  words score higher; “BANANA” scores higher than “BAN”. After
                  all the tiles are filled, you have a few seconds to submit a
                  word or the game ends. There are three levels of play to
                  choose from. Name and City is requested for the leaderboard.
                </Text>
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: "center",
                      marginTop: 15,
                      fontSize: 17,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Enter your name :
                  </Text>
                </View>
                {console.log(this.state.Name, "options")}
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="Name"
                  value={this.state.Name}
                  returnKeyType="next"
                  onFocus={this.inputFocused.bind(this, "Name")}
                  onSubmitEditing={(event) => {
                    this.refs.SecondInput.focus();
                  }}
                  onChange={this.handleChange.bind(this, "Name")}
                />
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: "center",
                      marginTop: 15,
                      fontSize: 17,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Enter your city :
                  </Text>
                </View>
                <TextInput
                  ref="SecondInput"
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="City"
                  value={this.state.City}
                  returnKeyType="done"
                  onFocus={this.inputFocused.bind(this, "City")}
                  onSubmitEditing={(event) => {
                    this.close();
                  }}
                  onChange={this.handleChange.bind(this, "City")}
                />
                <TouchableOpacity
                  onPress={this.close.bind(this)}
                  style={{
                    height: 40,
                    marginTop: 30,
                    marginLeft: windowSize.width / 4,
                    marginRight: windowSize.width / 4,
                    backgroundColor: "#27ae61",
                    marginBottom: 30,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: "center",
                      fontSize: 25,
                      marginTop: 6,
                      color: "white",
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.body}>
              <Card style={{ height: 60, width: windowSize.width }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        textAlign: "center",
                        paddingLeft: "60%",
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: textFont,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Enter Your Name:
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: windowSize.width / 6 }}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={{
                          height: 60,
                          width: windowSize.width / 6,
                          marginLeft: 10,
                          fontSize: textFont,
                          justifyContent: "center",
                          color: "black",
                        }}
                        placeholder="Name"
                        value={this.state.Name}
                        returnKeyType="next"
                        onSubmitEditing={(event) => {
                          this.refs.SecondInput.focus();
                        }}
                        onChange={this.handleChange.bind(this, "Name")}
                      />
                    </View>
                  </View>
                </View>
              </Card>
              {/*<Card.Content style={{ height: 1, backgroundColor: 'black', marginLeft: "45%", marginRight: "30%" }}></Card.Content>*/}
              <View style={{ height: 60, width: windowSize.width }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingLeft: "60%",
                        textAlign: "center",
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: textFont,
                          marginLeft: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Enter Your City:
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: windowSize.width / 6 }}>
                    <View style={{ flex: 1 }}>
                      <TextInput
                        ref="SecondInput"
                        style={{
                          height: 60,
                          width: windowSize.width / 6,
                          marginLeft: 10,
                          fontSize: textFont,
                          justifyContent: "center",
                          color: "black",
                        }}
                        returnKeyType="done"
                        placeholder="City"
                        value={this.state.City}
                        onSubmitEditing={(event) => {
                          Keyboard.dismiss;
                        }}
                        onChange={this.handleChange.bind(this, "City")}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View>
                <Text
                  allowFontScaling={false}
                  style={[styles.levelText, { marginBottom: 20 }]}
                >
                  Choose level:
                </Text>
                
                <View style={{ height: 80 }}>
                  <View style={styles.row1}>
                    <View style={styles.row1_column1}>
                      <TouchableOpacity
                        style={[styles.blue_column,styles.shadowProp]}
                        onPress={this.select.bind(this, "Beginner")}
                      >
                        <View
                          style={{
                            
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ fontSize: FONT,justifyContent:"center",textAlign:'center' }}
                          >
                            Beginner
                          </Text>
                        </View>
                        <View
                          style={{
                            
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.Level == "Beginner" ? (
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../assets/check.png")}
                            />
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.row1_column2}>
                      <TouchableOpacity
                        style={[styles.green_column,styles.shadowProp]}
                        onPress={this.select.bind(this, "Intermediate")}
                      >
                        <View
                          style={{
                            
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ fontSize: FONT ,justifyContent:"center",textAlign:'center'}}
                          >
                            Intermediate
                          </Text>
                        </View>
                        <View
                          style={{
                           
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.Level == "Intermediate" ? (
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../assets/check.png")}
                            />
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.row2}>
                    <View style={styles.row2_column1}>
                      <TouchableOpacity
                        style={[styles.blue_column,styles.shadowProp]}
                        onPress={this.select.bind(this, "Advanced")}
                      >
                        <View
                          style={{
                            
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ fontSize: FONT ,justifyContent:"center",textAlign:'center'}}
                          >
                            Advanced
                          </Text>
                        </View>
                        <View
                          style={{
                           
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.Level == "Advanced" ? (
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../assets/check.png")}
                            />
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.row2_column2}>
                      <TouchableOpacity
                        style={[styles.green_column,styles.shadowProp]}
                        onPress={this.select.bind(this, "Pro")}
                      >
                        <View
                          style={{
                            
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ fontSize: FONT,justifyContent:"center",textAlign:'center' }}
                          >
                            Pro
                          </Text>
                        </View>
                        <View
                          style={{
                           
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {this.state.Level == "Pro" ? (
                            <Image
                              style={{ height: 30, width: 30 }}
                              source={require("../../assets/check.png")}
                            />
                          ) : (
                            <View></View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: height, width: windowSize.width }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign:'center',
                }}
              >
                <TouchableOpacity
                  onPress={this.play.bind(this)}
                  style={[styles.shadowProp,{
                    marginRight:'15%',
                    marginLeft:'5%',
                    height: height,
                    backgroundColor: "#27ae61",
                    width:"15%",
                    borderRadius:15
                  }]}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: FONT,
                      }}
                    >
                      Play Now
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.home.bind(this)}
                  style={[styles.shadowProp,{
                    width:"15%",
                    height: height,
                    backgroundColor: "#34475d",
                    borderRadius:15,
                    marginRight:'5%',
                    marginleft:'15%',
                  }]}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: FONT,
                      }}
                    >
                      Home
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

          
            <Modal
              style={[styles.modal, styles.modal3]}
              position={"center"}
              ref={"modal3"}
              backdropPressToClose={false}
            >
              <View style={{ flex: 1, width: windowSize.width - 50 }}>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View>
                    {this.state.Name == null ||
                    this.state.Name == "null" ||
                    (this.state.Name == "" && this.state.City == null) ||
                    this.state.City == "null" ||
                    this.state.City == "" ? (
                      <Text
                        allowFontScaling={false}
                        style={{ textAlign: "center", fontSize: 17 }}
                      >
                        Please Enter Name and City
                      </Text>
                    ) : this.state.Name == null ||
                      this.state.Name == "null" ||
                      this.state.Name == "" ? (
                      <Text
                        allowFontScaling={false}
                        style={{ textAlign: "center", fontSize: 17 }}
                      >
                        Please Enter Name
                      </Text>
                    ) : this.state.City == null ||
                      this.state.City == "null" ||
                      this.state.City == "" ? (
                      <Text
                        allowFontScaling={false}
                        style={{ textAlign: "center", fontSize: 17 }}
                      >
                        Please Enter City
                      </Text>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.3,
                    backgroundColor: "#013369",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={this.onOk.bind(this)}>
                    <View
                      style={{ justifyContent: "center", alignSelf: "center" }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{ color: "white", textAlign: "center" }}
                      >
                        OK
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </Card>
    );
  }
}
