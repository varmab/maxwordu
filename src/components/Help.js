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
   
  }
  
  render() {
    return (
      <Card style={{ flex: 1 ,backgroundColor:'white'}}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={'Help'}
        />
        <Card.Content style={{ marginTop: 40, flex: 1, paddingHorizontal:7, }}>
          <Text style={{ fontSize: 13,color:'black' }}>
          MaxWord is for busy word game lovers who might only have a few minutes. Make words with the letters given; correct words remove letters. Make as many words as you can before all the tiles fill up. A letter can be used more than once per word, and longer words score higher; “banana” scores double what “ban” would.
          </Text>
         
          <Title style={{ fontSize: 14, fontWeight:'bold',color:'black' }}>Levels</Title>
          <Text style={{ fontSize: 13,color:'black' }}>
          Beginner (3 seconds between letters, 7 seconds after tiles fill up), Intermediate (2s/5s), Advanced (1s/3s), and Pro (0.5s/2s)

          </Text>
          <Title style={{ fontSize: 14, fontWeight:'bold',color:'black' }}>Word Scoring Formula
          </Title>
          <Text style={{ fontSize: 13,color:'black' }}>
          The number of letters in a correct word multiplied by the level (Beginner=1, Intermediate=2, Advanced=3, Pro=4)

          </Text>
          <Title style={{ fontSize: 14, fontWeight:'bold',color:'black' }}>Posting Scores</Title>
          <Text style={{ fontSize: 13,color:'black' }}>
          User will have the option of posting high scores to our server.

          </Text>
          <Text style={{ fontSize: 13, marginTop:40,color:'black' }}>
          Feedback, suggestions, complaints, missing words? Please send an email to:
         
        
                <TouchableOpacity onPress={() => {
                  Linking.openURL('mailto:maxword@vimware.com') 
                }}
                title="maxword@vimware.com"
                >
                  <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
                  maxword@vimware.com
                  </Text>
                </TouchableOpacity>
                </Text>
        </Card.Content>
        
      </Card>
    );
  }
};


export default  Help