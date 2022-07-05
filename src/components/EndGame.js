
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList
} from 'react-native'
import React, { Component } from 'react'
import Header from './Header';
import styles from './../Styles/endGameStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {ShareDialog, canShow} from 'react-native-fbsdk'
import axios from 'axios';
import { Card ,DataTable,Content,Title,Paragraph} from 'react-native-paper';
import { CardAnimationContext } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/FontAwesome'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Endcomponent from './endcomponent';



var windowSize = Dimensions.get('window');
var Margin_botton='5%'
if(windowSize.width>1000){
  Margin_botton='5%'
   
}else if(windowSize.width>300 && windowSize.width<420){
  Margin_botton='35%'
    
}else if(windowSize.width<300){
  Margin_botton='35%'
}


const myScore_icon = (
  <Icon name="list-ol" size={35} color="white"/>)

const option_icon = (
  <Icon name="bars" size={35} color="white"/>)

const restart_icon = (
  <Icon name="rotate-left" size={35} color="white"/>)

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

 
  UNSAFE_componentWillMount() {
    // this.getASyncData()
    // console.log(this.props.route.params, "props");
    //  alert("Level:"+this.props.Level)
    if (this.props.userId != undefined) {
      fetch('http://www.maxword.net/api/user/rank/' + this.props.udid + '/' + this.props.Level)
        .then((response) => response.json())
        .then((responseJson) => {
          
          this.setState({ Rank: responseJson.User.rank })
          console.log(response,'$$$$rank$$$$$')
        })
    } else {
      this.setState({ Rank: 'NA'})
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
    
    // this.test()
    // fetch('http://www.maxword.net/api/getTopScore')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({ topScore: responseJson.Score[0].totalScore })
    //   })
  }



  // topScore() {
  //   // alert("Level:"+this.props.Level)
  //   if (this.props.Level == 'GameDay') {
  //     var Level = "gameOfTheDay"
  //   } else {
  //     var Level = this.props.route.params.Level
  //   }
   
  //   this.props.navigation.navigate('TopScores',{Score:this.props.route.params.scores,name: this.props.route.params.Name,city: this.props.route.params.City,Level:this.props.route.params.Level,time: this.props.route.params.time});
  // }

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
   
    this.props.navigation.navigate('MyScores', { scoreData:this.state.scoreData });
  }
  reStart() {
   
    this.props.navigation.replace('PlayNow');
  }
  option() {
   
    this.props.navigation.navigate('Options');
  }

  render() {
    // console.log(this.props.route.params,"df");
    return (
      <Card style={{flex:1,backgroundColor:'white' }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={'MaxWord'}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center',marginBottom:40 }}>
                <Text allowFontScaling={false} style={styles.gameOver}>Game Over!</Text>
        </View>

          <Endcomponent
          scores={this.props.route.params.scores}
          level={this.props.route.params.Level}
          rank={this.state.Rank}
          time={this.props.route.params.time}
          />

          <Card style={{flex:1,backgroundColor:'white'}}>
          <View style={{ flex: 0.50, flexDirection: 'row' }}>
          <Card.Content style={styles.body}>
            <Text allowFontScaling={false} style={styles.gameOver}>Correct ({this.props.route.params.correct.length})</Text>
            <CorrectListView data={this.props.route.params.correct} />
          </Card.Content>
          <Card.Content style={styles.subBody}>
        <Text allowFontScaling={false} style={styles.gameOver}>Incorrect ({this.props.route.params.Incorrect.length})</Text>
            <InCorrectListView data={this.props.route.params.Incorrect} />
          </Card.Content>
        </View>
          </Card>
          
         
         
      
          <View style={{flex:0.5,justifyContent:'center',alignItems:'center',marginBottom:Margin_botton}}>
          <View style={{paddingBottom:5}}> 
          <FontAwesome.Button  backgroundColor="red" onPress={alert("top scores will release shortly")}>
          Show Top Scores
          </FontAwesome.Button>
          </View>  
         
          
            
          <View style={{}}> 
            <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={this.FB.bind(this)}>
              Share With your friends
            </FontAwesome.Button>
            </View>  
          </View>
       
       
      
      
    
        <View style={styles.button}>
                  <View>
                    <TouchableOpacity onPress={this.myScores.bind(this)}>
                      <View style={styles.buttonParent}>
                        <LinearGradient
                          colors={['#848484', "#535353","#313131"]}
                          style={styles.buttonGrad}
                        >
                          {myScore_icon}
                          <Text style={styles.text_button}>MYSCORES</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <TouchableOpacity onPress={this.option.bind(this)}>
                      <View style={styles.buttonParent}>
                        <LinearGradient
                          colors={['#848484', "#535353","#313131"]}
                          style={styles.buttonGrad}
                        >
                          {option_icon}
                          <Text style={styles.text_button}>OPTIONS</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{}}>
                    <TouchableOpacity onPress={this.reStart.bind(this)}>
                      <View style={styles.buttonParent}>
                        <LinearGradient
                          colors={['#848484', "#535353","#313131"]}
                          style={styles.buttonGrad}
                        >
                          {restart_icon}
                          <Text style={styles.text_button}>RESTART</Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
    
     
   
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

const styles1 = StyleSheet.create({
  card_container: {
    
    borderColor:'black',
    borderWidth:1,
    backgroundColor: '#ecf0f1',
    
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
