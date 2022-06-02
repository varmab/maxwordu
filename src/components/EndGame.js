// import React from 'react-native';
// import reactNativeStore from 'react-native-store';
// import _ from 'underscore';

// import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-86654723-1');

// tracker.trackScreenView('EndGame');
// import styles from './../Styles/endGameStyles';

// var{
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   ListView
// } = React;



// var FONT   = 17;
// var textFont = 15;
// var Margin = 28;
// if(windowSize.width == 320){
//   var textFont = 13;
// }
// if(windowSize.width == 768){
//   FONT   = 30,
//   Margin = 50
// }


//   
// 

//  




import {
  View,
  StyleSheet,
  
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
  Dimensions,
  FlatList
} from 'react-native'
import React, { Component } from 'react'
import Header from './Header';
import styles from './../Styles/endGameStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const FBSDK = require('react-native-fbsdk');
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {ShareDialog, canShow} from 'react-native-fbsdk'
import axios from 'axios';
import { Card, Text } from 'react-native-paper';


var windowSize = Dimensions.get('window');

// const {
//   LoginButton,
//   ShareDialog,
// } = FBSDK;
export class EndGame extends Component {

  constructor(props) {
    super(props);

    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://www.facebook.com/maxwordapp',
      contentDescription: 'Wow, check out this great site!',
    };
    

    this.state = {
      Data: [],
      Level: 'Beginner',
      topScore: '',
      shareLinkContent: shareLinkContent,
      Months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      scoreData: [],
      uuid:getUniqueId()
    };
  }

  async test() {
    var d = new Date();
    var month = this.state.Months[d.getMonth()];
    var day = d.getDate();
    var date = day + " " + month;
    var Level = this.props.route.params.Level;
    var Name = this.props.route.params.Name;
    var Points = this.props.route.params.Points;
    var Score = this.props.route.params.scores;
    // var userModel = await reactNativeStore.model("user");
    // var add_data = await userModel.add({
    //   time: this.props.time,
    //   correct: this.props.correct.length,
    //   Incorrect: this.props.Incorrect.length,
    //   Name: Name,
    //   Level: Level,
    //   date: date,
    //   Rank: '',
    //   Points: Points,
    //   Score: Score,
    //   bannerSize: 'smartBannerPortrait'
    // });
    // var get_data = await userModel.find();
    var add_data = {
      time: this.props.route.params.time,
      correct: this.props.route.params.correct.length,
      Incorrect: this.props.route.params.Incorrect.length,
      Name: Name,
      Level: Level,
      date: date,
      Rank: '',
      Points: Points,
      Score: Score,
      bannerSize: 'smartBannerPortrait',
      uuid:this.state.uuid
    };
    // console.log(this.state.scoreData, "........1");
    if (this.state.scoreData.length !== 0) {
      this.state.scoreData.push(add_data)
      // console.log(this.state.scoreData, "........2");
      // await AsyncStorage.setItem("scores", JSON.stringify([...this.state.scoreData]))
      await AsyncStorage.setItem("scores", JSON.stringify(this.state.scoreData))
    } else
      this.state.scoreData.push(add_data)
      await AsyncStorage.setItem("scores", JSON.stringify(this.state.scoreData))
    this.setState({ Data: add_data });
  }

  // async getASyncData() {
  //   let asynData = await AsyncStorage.getItem("scores")
  //   let parse = JSON.parse(asynData)
  //   this.setState({ scoreData: "parse" })
  //   console.log(asynData,"asyn");
  // }
  UNSAFE_componentWillMount() {
    // this.getASyncData()
    // console.log(this.props.route.params, "props");
    //  alert("Level:"+this.props.Level)
    if (this.props.userId != undefined) {
      fetch('http://www.maxword.net/api/user/rank/' + this.props.udid + '/' + this.props.Level)
        .then((response) => response.json())
        .then((responseJson) => {
          
          this.setState({ Rank: responseJson.User.rank })
        })
    } else {
      this.setState({ Rank: null })
    }

  }
  

  async componentDidMount() {
    console.log("dis", this.state.scoreData.length, this.state.scoreData);

    let asynData = await AsyncStorage.getItem("scores")
    let parse = JSON.parse(asynData)
    // console.log(parse, "parse");
    if (parse !== null) {
      this.state.scoreData.push(...parse)
    }
    // console.log(this.state.scoreData, "........0");


    // let asynData = await AsyncStorage.getItem("scores")
    // let parse = JSON.parse(asynData)
    // console.log(parse, "parse");
    // if (parse !== null) {
    //   // if (parse.length !== 0) {
    //     this.setState({ scoreData: parse })
    //   // }else
    //   // this.setState({ scoreData: [parse] })
    // }
    // console.log(this.state.scoreData, "........0");


   
    this.test()
    fetch('http://www.maxword.net/api/getTopScore')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ topScore: responseJson.Score[0].totalScore })
      })
  }



  topScore() {
    // alert("Level:"+this.props.Level)
    if (this.props.Level == 'GameDay') {
      var Level = "gameOfTheDay"
    } else {
      var Level = this.props.route.params.Level
    }
    // var topScores = require('./topScores');
    // this.props.navigator.push({
    //   component: topScores,
    //   title: Level + ' Scores',
    //   passProps: { Level: Level }
    // });
    this.props.navigation.navigate('TopScores',{Score:this.props.route.params.scores,name: this.props.route.params.Name,city: this.props.route.params.City,Level:this.props.route.params.Level,time: this.props.route.params.time});
  }

  FB() {
     var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Facebook share has been cancelled');
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }
  myScores() {
    // var myScores = require('./MyScores');
    var time = this.props.time
    var Data = this.state.Data
    var correctLength = this.props.route.params.correct.length
    var IncorrectLength = this.props.route.params.Incorrect.length
    var Score = this.props.route.params.Score
    // this.props.navigator.push({
    //   component: myScores,
    //   title: 'My Scores',
    //   passProps: { correctLength, time, IncorrectLength, Data }
    // });
    this.props.navigation.navigate('MyScores', { scoreData:this.state.scoreData });
  }
  reStart() {
    // var Play = require('./Play');
    // this.props.navigator.push({
    //   name: 'Play Now',
    //   component: Play,
    //   title: 'Play Now',
    // });
    this.props.navigation.replace('PlayNow');
  }
  option() {
    // var Options = require('./Options');
    // this.props.navigator.push({
    //   name:'Options',
    //   component: Options,
    //   title: 'Options',
    // });
    this.props.navigation.navigate('Options');
  }

  render() {
    // console.log(this.props.route.params,"df");
    return (
      <Card style={{ flex: 1, }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={'MaxWord'}
        />
        <Card.Content style={[styles.container, {}]}>
          <Card.Content style={styles.header}>
            <View style={{ width: windowSize.width, }}>
              <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text allowFontScaling={false} style={styles.gameOver}>Game Over!</Text>
              </View>
            </View>
            <View style={{ marginTop: 20, width: windowSize.width }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text allowFontScaling={false} style={styles.Score}>Score: {this.props.route.params.scores}</Text>
                </View>
                <View style={{ width: '50%' }}>
                  {this.state.Rank == null ? (
                    <Text allowFontScaling={false} style={styles.Score}>Rank: NA</Text>
                  ) :
                    <Text allowFontScaling={false} style={styles.Score}>Rank: {this.state.Rank}</Text>}
                </View>
              </View>
            </View>
            <View style={{ height: 30, width: windowSize.width }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  {windowSize.width != 768 ? (
                    <Text allowFontScaling={false} style={styles.Level}>Level: {this.props.route.params.Level}</Text>
                  ) : (
                    <Text allowFontScaling={false} style={{ marginTop: 8, fontSize: textFont, fontStyle: 'italic', color: '#4B4C4D', marginLeft: 130, marginBottom: 5 }}>Level: {this.props.Level}</Text>
                  )}
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text allowFontScaling={false} style={styles.Time}>Time: {this.props.route.params.time}</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 30, width: windowSize.width }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  {windowSize.width != 768 ? (
                    <Text allowFontScaling={false} style={styles.Correct}>Correct: {this.props.route.params.correct.length}</Text>
                  ) : (
                    <Text allowFontScaling={false} style={{ fontSize: textFont, fontStyle: 'italic', color: '#4B4C4D', marginLeft: 140 }}>Correct: {this.props.correct.length}</Text>
                  )}
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text allowFontScaling={false} style={styles.Incorrect}>Incorrect: {this.props.route.params.Incorrect.length}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
          <View style={{ width: windowSize.width, marginVertical:50}}>
            <View style={{ flexDirection: 'row', marginTop:50 }}>
              <View style={{ width: '50%' ,}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 17, color: 'blue', textDecorationLine: 'underline' }} onPress={this.topScore.bind(this)}>Show Top Scores</Text>
                </View>
              </View>
              <View style={{ width: '50%' }}>
                <View >
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={this.FB.bind(this)}>
                     {windowSize.width == 768 ? (
                    <Image style={{ width: 30, height: 30, marginLeft: 10, marginTop: 15 }} source={require('../../assets/facebook.png')} />
                  ) : (
                    <Image style={{ width: 30, height: 30, marginRight: 100, marginTop: 10, }} source={require('../../assets/facebook.png')} />
                  )} 
                    {windowSize.width != 768 ? (
                      <View style={{ width: '80%', height: 50, }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                          <Text allowFontScaling={false} style={{ fontSize: 17, color: 'blue', textDecorationLine: 'underline' }} >Tell your friends about  MaxWord</Text>
                        </View>
                      </View>) : (
                      <View style={{ width: '100%' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text allowFontScaling={false} style={{ fontSize: 17, color: 'blue', textDecorationLine: 'underline' }} >Tell your friends about MaxWord</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.50, flexDirection: 'row' }}>
            <View style={styles.body}>
              <Text allowFontScaling={false} style={styles.gameOver}>Correct</Text>
              <CorrectListView data={this.props.route.params.correct} />
            </View>
            <View style={styles.subBody}>
              <Text allowFontScaling={false} style={styles.gameOver}>Incorrect</Text>
              <InCorrectListView data={this.props.route.params.Incorrect} />
            </View>
          </View>
          <Card.Content style={[styles.footer]}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.subRow,{marginRight:'5%',marginLeft:'70.5vh'}]} onPress={this.myScores.bind(this)}>
                <Text allowFontScaling={false} style={styles.Text}>My Scores</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.subRow1,{marginRight:'5%'}]} onPress={this.option.bind(this)}>
                <Text allowFontScaling={false} style={styles.Text}>Options</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subRow} onPress={this.reStart.bind(this)}>
                <Text allowFontScaling={false} style={styles.Text}>Restart</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card.Content>
      </Card>
    )
  }
}

class InCorrectListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.data,
    }
  }

  _renderRow(data) {
    return (
      <Text allowFontScaling={false} style={styles.correctWords}>{data.item}</Text>
    )
  }
  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this._renderRow.bind(this)}
        keyExtractor={item => item.id}
      />
    )
  }
}

class CorrectListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.data
    }
  }
  _renderRow(data) {
    return (
      <Text allowFontScaling={false} style={styles.correctWords}>{data.item}</Text>
    )
  }
  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        renderItem={this._renderRow.bind(this)}
        keyExtractor={item => item.id}
      />
    )
  }
}
export default EndGame