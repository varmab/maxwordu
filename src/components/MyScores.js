// var React = require('react-native');
// var ResponsiveImage = require('react-native-responsive-image');
// var reactNativeStore = require('react-native-store');
// var _ = require('underscore');
// var Dimensions = require('Dimensions');
// var windowSize = Dimensions.get('window');
// import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-86654723-1');

// tracker.trackScreenView('My scores');
// import styles from './../Styles/myScoresStyles';
// var{
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   ListView,
//   AsyncStorage
// } = React;

// var FONT   = 17;
// var Margin = 28;
// if(windowSize.width == 768){
//   FONT   = 30,
//   Margin = 50
// }


// class Main extends React.Component{
//   constructor(props){
//     super(props);
//       this.state = {
//         Data:[],
//         bannerSize: 'smartBannerPortrait',
//         dumy:{time:this.props.time,correct:this.props.correctLength,Incorrect:this.props.IncorrectLength}
//       };
//   }
//   home(){
//    this.props.navigator.popToTop();
//   }
//   reStart(){
//     var play = require('./Play');
//     this.props.navigator.push({
//       component: play,
//       title: 'Play Now',
//     });
//   }
//   componentWillUnmount(){
//     AdMobInterstitial.removeAllListeners();
//     //alert("myscores unMount")
//   }
//   componentDidMount(){
//     AdMobInterstitial.setTestDeviceID('EMULATOR');
//     AdMobInterstitial.setAdUnitID('ca-app-pub-7238183882077023/4085192590');

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
//   render(){
//     return(
//       <View style={styles.container}>
//         <View style={styles.body}>
//           <List data={this.props.Data}/>
//         </View>
//         <View style={styles.footer}>
//           <View style={styles.row}>
//             <TouchableOpacity style={styles.subRow} onPress={this.home.bind(this)}>
//               <Text allowFontScaling={false} style={styles.Text}>Home</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.subRow1} onPress={this.reStart.bind(this)}>
//               <Text allowFontScaling={false} style={styles.Text}>Restart</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{marginTop:3}}>
//           <AdMobBanner
//             bannerSize={this.state.bannerSize}
//             testDeviceID="EMULATOR"
//             adUnitID="ca-app-pub-7238183882077023/4085192590"/>
//         </View>
//       </View>
//       );
//   }
// };



// module.exports = Main


import React, { Component } from 'react';
import Header from './Header';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  FlatList,
  Dimensions, TouchableWithoutFeedback,
  Linking, AppRegistry
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './../Styles/myScoresStyles';
import { Card, Divider } from 'react-native-paper';

class MyScores extends Component {
  constructor(props) {
    super(props);
    // console.log(props.route.params.scoreData,"......");
    // AsyncStorage.getItem("scores").then(res => this.setState({ dataSource: res }));
    this.state = {
      dataSource: []
    };

  }

  async componentDidMount() {
    let asynData = await AsyncStorage.getItem("scores")
    let parse = JSON.parse(asynData)
    // console.log(parse);
    this.state.dataSource.push(...parse)
    // console.log(this.state.dataSource,'..........');
  }

  home() {
    this.props.navigation.navigate('Main');
  }
  reStart() {
    this.props.navigation.replace('PlayNow');
  }
  _renderRow(data) {
    return (
      <Card>
        <Card.Content style={styles.ListContainer}>
          <View style={styles.subContainer}>
            {data.item.Name == null ? (
              <Text allowFontScaling={false} style={styles.maxWordsText}>MaxWords {data.item.time}</Text>
            ) :
              <Text allowFontScaling={false} style={styles.maxWordsText}>{data.item.Name} {data.item.time}</Text>}
            <Text allowFontScaling={false} style={styles.date}>{data.item.date}</Text>

          </View>
          <View style={styles.subContainer1}>
            <Text allowFontScaling={false} style={styles.correctText}>Score :{data.item.Score}</Text>
          </View>
          <View style={styles.subContainer2}>
            <Text allowFontScaling={false} style={styles.LevelText}>Level: {data.item.Level}</Text>
            <Text allowFontScaling={false} style={styles.IncorrectText}>Correct :{data.item.correct}</Text>
          </View>
        </Card.Content>
        <Divider style={{ backgroundColor: 'gray' }} />
      </Card>
    )
  }

  render() {
    return (
      <Card.Content style={{ flex: 1, paddingHorizontal: 0 }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.goBack()}
          title={'MyScores'}
        />


        {/* <List data={this.props.route.params.scoreData} /> */}
        <Card.Content style={{paddingHorizontal:0,flex:1}}>
        <FlatList
          data={this.props.route.params.scoreData}
          renderItem={this._renderRow.bind(this)}
          automaticallyAdjustContentInsets={false} />
        </Card.Content>
       
        <Card.Content style={styles.footer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.subRow} onPress={this.home.bind(this)}>
              <Text allowFontScaling={false} style={styles.Text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subRow1} onPress={this.reStart.bind(this)}>
              <Text allowFontScaling={false} style={styles.Text}>Restart</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>

      </Card.Content>
    );
  }
}


class List extends React.Component {
  constructor(props) {
    super(props);
    // var ds = new ListView.DataSource({
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    // });
    // console.log(props.data, "///////");
    this.state = {
      // dataSource: ds.cloneWithRows(this.props.data.reverse()),
      dataSource: props.data
    }
  }
  _renderRow(data) {
    console.log("data");
    return (
      <View style={styles.ListContainer}>
        <View style={styles.subContainer}>
          {data.Name == null ? (
            <Text allowFontScaling={false} style={styles.maxWordsText}>MaxWords {data.time}</Text>
          ) :
            <Text allowFontScaling={false} style={styles.maxWordsText}>{data.Name} {data.time}</Text>}
          <Text allowFontScaling={false} style={styles.LevelText}>Level: {data.Level}</Text>
        </View>
        <View style={styles.subContainer1}>
          <Text allowFontScaling={false} style={styles.date}>{data.date}</Text>
          <Text allowFontScaling={false} style={styles.correctText}>Score :{data.Score}</Text>
          <Text allowFontScaling={false} style={styles.IncorrectText}>Correct :{data.correct}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this._renderRow.bind(this)}
        automaticallyAdjustContentInsets={false} />
    )
  }
}

export default MyScores;
