// import React from 'react-native';
// import _ from 'underscore';
// import Dimensions from 'Dimensions';
// var windowSize = Dimensions.get('window');
// import moment from 'moment';
// import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-86654723-1');

// tracker.trackScreenView('Top scores');
// import styles from './../Styles/topScoresStyles';


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


// class topScore extends React.Component{
//   constructor(props){
//     super(props);
//       this.state = {
//         dataSource: new ListView.DataSource({
//           rowHasChanged: (row1, row2) => row1 !== row2,
//         }),
//         bannerSize: 'smartBannerPortrait',
//         Data:[],
//         dumy:{time:this.props.time,correct:this.props.correctLength,Incorrect:this.props.IncorrectLength}
//       };
//   }

//   home(){
//    this.props.navigator.popToTop();
//   }
//   help(){
//     var webView = require('./Help');
//      this.props.navigator.push({
//       component:webView,
//       title: 'Help'
//      })
//   }
//   reStart(){
//     var play = require('./Play');
//     this.props.navigator.push({
//       component: play,
//       title: 'Play Now',
//     });
//   }
//   componentWillMount(){
//     fetch('https://maxwords.herokuapp.com/api/getScores/'+this.props.Level)
//       .then((response) => response.json())
//       .then((responseJson) => {
//        this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(responseJson.Score),
//       })
//       })
//   }
//   componentDidMount(){
//     AdMobInterstitial.setTestDeviceID('EMULATOR');
//     AdMobInterstitial.setAdUnitID('ca-app-pub-7238183882077023/2286757396');

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
//         <View style={{height:60}}>
//           <View style={{flex:1,flexDirection:'row',backgroundColor:'#34475d'}}>
//             <View style={{flex:0.3}}>
//             <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Name</Text>
//             </View>
//             <View style={{flex:0.3}}>
//               <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>City</Text>
//             </View>
//             <View style={{flex:0.2}}>
//               <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Score</Text>
//             </View>
//             <View style={{flex:0.2}}>
//               <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Date</Text>
//             </View>
//           </View>
//         </View>
//          <View style={{flex:1}}>
//            <ListView
//             dataSource={this.state.dataSource}
//             renderRow={this._renderRow.bind(this)}
//             automaticallyAdjustContentInsets={false}/>
//          </View>
//         </View>
        
//         <View style={styles.footer}>
//           <View style={styles.row}>
//           <TouchableOpacity style={styles.subRow} onPress={this.home.bind(this)}>
//                 <Text allowFontScaling={false} style={styles.Text}>Home</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.subRow1} onPress={this.reStart.bind(this)}>
//               <Text allowFontScaling={false} style={styles.Text}>Restart</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.subRow} onPress={this.help.bind(this)}>
//                 <Text allowFontScaling={false} style={styles.Text}>Help</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{marginTop:3}}>
//         <AdMobBanner
//           bannerSize={this.state.bannerSize}
//           testDeviceID="EMULATOR"
//           adUnitID="ca-app-pub-7238183882077023/2286757396"/>
//         </View>
//       </View>
//       );
//   }
//   _renderRow(data){
//     var date = moment(data.createdDate).format('DD MMM')
//     return(
//        <View style={styles.ListContainer}>
//         <View style={styles.subContainer}>
//         {data.name == null ?(
//           <Text allowFontScaling={false} style={styles.maxWordsText}>MaxWords</Text>
//           ):
//           <Text allowFontScaling={false} style={styles.maxWordsText}>{data.name} </Text>}
//           <Text allowFontScaling={false} style={styles.LevelText}>{data.city}</Text>
//           <Text allowFontScaling={false} style={styles.ScoreText}>{data.score}</Text>
//           <Text allowFontScaling={false} style={styles.date}>{date}</Text>
//         </View>
//       </View>
//       )
//   }
// };

// module.exports = topScore

import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
//import { Card } from 'react-native-paper'
import Header from './Header';
import styles from '../Styles/topScoresStyles'
import { Card, Text } from 'react-native-paper';
import moment from 'moment';
import axios from 'axios';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default class TopScores extends Component {
  constructor(props){
  super(props);
  
      this.state = {
        // dataSource: new ListView.DataSource({
        //   rowHasChanged: (row1, row2) => row1 !== row2,
        // }),
        dataSource:[],  
       
        // Data:[],
        // dumy:{time:this.props.route.params.time,city:this.props.route.params.city,name:this.props.route.params.name,score:this.props.route.params.score}
        
      };
  }

  home(){
    this.props.navigation.navigate('Main'); 
  }
  help(){
    this.props.navigation.navigate('Help');
  }
  reStart(){
    this.props.navigation.replace('PlayNow');
  }
  UNSAFE_componentWillMount(){
    
    axios.get('http://www.maxword.net/api/getscores/'+this.props.route.params.Level)
    .then((responseJson) => {
      // console.log(responseJson.data.Score)
      this.setState({
       dataSource: responseJson.data.Score.slice(0,30)
     })
     })
      
  
  }
  
  _renderRow(data){
    // console.log(data,"id extract"); 
    
    var date = moment(data.item.createdDate).format('MMM YYYY')
    return(
      
       <Card.Content style={styles.ListContainer} >
        <View style={styles.subContainer}>
        {data.item.name == null ?(
          <Text allowFontScaling={false} style={styles.maxWordsText}>MaxWords</Text>
          ):
          <Text allowFontScaling={false} style={styles.maxWordsText}>{data.item.name} </Text>}
          <Text allowFontScaling={false} style={styles.LevelText}>{data.item.city}</Text>
          <Text allowFontScaling={false} style={styles.ScoreText}>{data.item.score}</Text>
          <Text allowFontScaling={false} style={styles.date}>{date}</Text>
        </View>
        
      </Card.Content>
     
      
      )
  }
 
 
 

  render(){
   
    
    return(
      <Card style={{ flex: 1, backgroundColor:'white'}}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.goBack()}
          title={'MyScores'}
        />
        <Card style={{flex:1}}>
        <View style={styles.container}>
        <View style={styles.body}>
        <View style={{height:60}}>
          <View style={{flex:1,flexDirection:'row',backgroundColor:'#34475d'}}>
            <View style={{flex:0.3}}>
            <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Name</Text>
            </View>
            <View style={{flex:0.3}}>
              <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>City</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Score</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text allowFontScaling={false} style={{textAlign:'center',marginTop:30,fontSize:15,color:'white'}}>Date</Text>
            </View>
          </View>
        </View>
         <View style={{flex: 1, paddingHorizontal: 0}} >
           <FlatList
            data={this.state.dataSource}
            renderItem={this._renderRow.bind(this)}
            keyExtractor={data => data.index}/>
            
         </View>
        </View>
        </View>
        </Card>
        
        
        
     
     
      <Card style={[styles.footer,{backgroundColor:'white'}]}>
        <Card.Content style={styles.row}>
            <TouchableOpacity style={[styles.subRow,styles.shadowProp]}
                onPress={this.home.bind(this)}
            >
                <Text allowFontScaling={false} style={styles.Text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subRow1,styles.shadowProp]}
                onPress={this.reStart.bind(this)}
            >
                <Text allowFontScaling={false} style={styles.Text}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subRow,styles.shadowProp]}
                onPress={this.help.bind(this)}
            >
                <Text allowFontScaling={false} style={styles.Text}>Help</Text>
            </TouchableOpacity>
        </Card.Content>
    </Card>
    </Card>
      );
  }
  

  
  
}

