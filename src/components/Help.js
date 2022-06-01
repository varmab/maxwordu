import React from 'react';
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
  Linking
} from 'react-native'
// var Dimensions = require('Dimensions');
import { Title, Card, Text } from 'react-native-paper';
import Header from './Header';

// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-86654723-1');
// tracker.trackScreenView('Help');

var windowSize = Dimensions.get('window');
// var {
//   ListView,
//   WebView
// } = React;

class Help extends React.Component {
  constructor() {
    super();
    this.state = {
      bannerSize: 'smartBannerPortrait'
    };
  }
  // componentWillUnmount() {
  //   AdMobInterstitial.removeAllListeners();
  //   //alert("Help unMount")
  // }
  // componentDidMount() {
  //   AdMobInterstitial.setTestDeviceID('EMULATOR');
  //   AdMobInterstitial.setAdUnitID('ca-app-pub-7238183882077023/5701526594');

  //   AdMobInterstitial.addEventListener('interstitialDidLoad',
  //     () => console.log('interstitialDidLoad event'));
  //   AdMobInterstitial.addEventListener('interstitialDidClose',
  //     this.interstitialDidClose);
  //   AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
  //     () => console.log('interstitialDidFailToLoad event'));
  //   AdMobInterstitial.addEventListener('interstitialDidOpen',
  //     () => console.log('interstitialDidOpen event'));
  //   AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
  //     () => console.log('interstitalWillLeaveApplication event'));

  //   AdMobInterstitial.requestAd((error) => error && console.log(error));
  // }
  render() {
    return (
      <Card style={{ flex: 1 }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={'Help'}
        />
        <Card.Content style={{ marginTop: 40, flex: 1, paddingHorizontal:7, }}>
          <Text style={{ fontSize: 13 }}>
            MaxWord is for busy word game lovers who only have a few minutes for a diversion.  Being online is not required to play.
          </Text>
          <Title style={{ fontSize: 14, fontWeight:'bold' }}>How to play</Title>
          <Text style={{ fontSize: 13 }}>
            Make words with the letters given; correct words remove letters.  Make as many as you can before the tiles fill up.  A letter can be used more than once and longer words score higher; “banana” scores double what “ban” would.
          </Text>
          <Title style={{ fontSize: 13, fontWeight:'bold' }}>Levels</Title>
          <Text>
            Beginner (3 secs between letters, 7 secs after tiles fill up) Intermediate (2 secs/5 secs) Advanced (1 sec/3 secs)
          </Text>
          <Title style={{ fontSize: 13, fontWeight:'bold' }}>Word Scoring</Title>
          <Text style={{ fontSize: 13 }}>
            The Number of Letters x The Level (Beginner=1, Intermediate=2, Advanced=3)
          </Text>
          <Title style={{ fontSize: 13, fontWeight:'bold' }}>Posting scores</Title>
          <Text style={{ fontSize: 13 }}>
            All high score posting to our server is anonymous other than the name you choose in Options.   You must be online to publish your score.
          </Text>
          <Text style={{ fontSize: 13, marginTop:40 }}>
            Feedback, suggestions, complaints, missing words? Go to
          </Text>
          <TouchableOpacity onPress={() => {
            
            Linking.openURL ( "https://www.facebook.com/maxwordapp" )
             
            
          }}
          >
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
              facebook.com/maxwordapp
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 13 }}>or email</Text>
          {/* <TouchableOpacity href="mailto:nowhere@mozilla.org" target="_top">
                  <Text>
                    maxword@vimware.com
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => {
                  Linking.openURL('mailto:maxword@vimware.com') 
                }}
                title="maxword@vimware.com"
                >
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                  maxword@vimware.com
                  </Text>
                </TouchableOpacity>
        </Card.Content>
        {/* </View> */}
      </Card>
    );
  }
};


export default  Help