import React, { Component } from 'react';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView,
    Dimensions,
    Platform,
    FlatList,
    
} from 'react-native'
import styles from './../Styles/playStyles';
import { Card, Portal, Modal, Button } from 'react-native-paper';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerMixin from 'react-timer-mixin';
import GLOBAL from './Globals';
import axios from "axios";
import Word8 from "../../assets/Word9"


var windowSize = Dimensions.get('window');
var height = windowSize.height 
var SIZE = 4; // four-by-four grid

var CELL_SIZE = 100; // 20% of the screen width
var WIDTH=0
var  font_size=12 
if(windowSize.width>420){
  WIDTH=Dimensions.get('window').width/7.5
  font_size=18
   
}else if(windowSize.width>300 && windowSize.width<420){
    WIDTH=Dimensions.get('window').width/4.5
    height=windowSize.height/1.2 
    font_size=15  
    
}else if(windowSize.width<300){
    WIDTH=Dimensions.get('window').width/4.5 
    height=windowSize.height/1.5  
    font_size=10 
}







var FONT = 16;
var Margin = 8;
var timer;
const containerStyle = {
    backgroundColor: 'transparent',
    padding: 20,
};

class Play extends React.Component {
    mixins = [TimerMixin]

    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: 0,
            timeDisplay: '',
            correctWords: [],
            incorrectWords: [],
            unusedLetters: [],
            usedLetters: [],
            Consonants: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z'],
            Vowels: ['A', 'E', 'I', 'O', 'U', 'Y'],
            currentSpeed: 0,
            //currentFont: GLOBAL.BASE.startFont,
            currentSeconds: 0,
            currentMinutes: 0,
            currentLetters: 0,
            msInterval: null,
            sTimestamp: 0,
            lettersTimestamp: this.currentSpeed - 1,
            currentWord: '',
            word: [],
            Level: 'Beginner',
            Name: '',
            City: '',
            value: '',
            Points: 1,
            count: 0,
            fakeCount: 0,
            interval: {},
            Score: 0,
            before: 0,
            timeInterval: 0,
            wrong: "No",
            disabled: false,
            animated: false,
            transparent: false,
            visible: false,
            bannerSize: 'smartBannerPortrait',
            visibleCross:false
        }
        this.refs = React.createRef();
    }
    
    
    success() {
        clearTimeout(timer);
        var count1 = this.state.count;
        var words = this.state.words
        var fakeCount = count1
        var correct = this.state.correctWords
        this.doRemoveLetters(this.state.value)
        count1 = count1 + 1;
        var Score = this.state.Score + this.state.value.length * this.state.Points
        correct.push(this.state.value);
        this.setState({ correctWords: correct })
        this.setState({ currentWord: '', count: count1, Score: Score, fakeCount: fakeCount })
    }

    fail() {
        var Incorrect = this.state.incorrectWords
        var wrong = this.state.incorrectWords
        this.setState({
            wrong: wrong
        })
        this.setState({ wrong: 'yes' });
        if (this.state.value != "") {
            Incorrect.push(this.state.value);
        }
        setTimeout(() => {
            this.setState({ incorrectWords: Incorrect })
            this.setState({ value: '', wrong: Incorrect })
        }, 300);
    }
    

    doRemoveLetters(word) {
        this.setState({
            before: this.state.word.length
        })
        removeDuplicateCharacters(word).then((responseData) => {
            var Vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
            for (var i = 0, n = responseData.length; i < n; ++i) {
                var c = responseData.charAt(i);
                this.state.word.map((res, i) => {
                    if (res == c) {
                        this.state.word.splice(i, 1);
                    }
                })
                this.setState({
                    value: ''
                })
                if (Vowels.indexOf(c) == -1) {
                    this.state.usedLetters.splice(c, 1);
                    this.state.unusedLetters.push(c);
                    this.state.Consonants.push(c);
                } else {
                    this.state.usedLetters.splice(c, 1);
                    this.state.unusedLetters.push(c);
                    this.state.Vowels.push(c);
                }
            }
        })
    }

    endGame() {

        //alert("end")
        // console.log("end");
        this.setState({
            animated: true,
            transparent: true,
            disabled: true,
            visible: true,
        })
        clearInterval(this.state.letterTimer)
        clearInterval(this.state.durationTimer)
        // this.model()
    }
    model(id) {
        this.refs.modal3.open();
    }
    onOk() {
        this.refs.modal3.close();
    }
    tick() {
      
        this.doLettersValue();
    
    }

    componentDidMount() {
       
        this.setState({ uuid: getUniqueId() })
        AsyncStorage.getItem("Name").then((value) => {
            this.setState({ Name: value })
        })
        AsyncStorage.getItem("City").then((value) => {
            this.setState({ City: value })
        })
        AsyncStorage.getItem("Level").then((value) => {
            if (value != null) {
                this.setState({ Level: value })
            }
        }).then(function () {
            var timeInterval = GLOBAL.LEVELS[0].startSpeed;
            if (this.state.Level == 'Beginner') {
                this.setState({ Points: 1, timeInterval: GLOBAL.LEVELS[0].startSpeed })
                timeInterval = GLOBAL.LEVELS[0].startSpeed;
            }
            if (this.state.Level == 'Intermediate') {
                this.setState({ Points: 2, timeInterval: GLOBAL.LEVELS[1].startSpeed })
                timeInterval = GLOBAL.LEVELS[1].startSpeed;
            }
            if (this.state.Level == 'Advanced') {
                this.setState({ Points: 3, timeInterval: GLOBAL.LEVELS[2].startSpeed })
                timeInterval = GLOBAL.LEVELS[2].startSpeed;
            }
            if (this.state.Level == 'Pro') {
                this.setState({ Points: 4, timeInterval: GLOBAL.LEVELS[3].startSpeed })
                timeInterval = GLOBAL.LEVELS[3].startSpeed;
            }
            this.doReset();
            this.tick();
            this.state.letterTimer = setInterval(() => {
                return this.tick()
            }, timeInterval);
            this.state.durationTimer = setInterval(() => {
                return this.setState({
                    timeElapsed: this.state.timeElapsed + 1,
                    timeDisplay: this.displayTimer(this.state.timeElapsed + 1)
                })
            }, 1000);
        }.bind(this));

    }
    UNSAFE_componentWillUnmount() {
        clearInterval(this.state.letterTimer)
        clearInterval(this.state.durationTimer)
    }
    wrongWord() {
        { windowSize.width == 320 ? (height = windowSize.height / 3.2) : windowSize.width == 375 ? (height = windowSize.height / 2.62) : (height = windowSize.height / 2.4) }
        return {
            fontSize: windowSize.width / 2,
            textAlign: 'center',
            height: height,
            color: 'red'
        }
    }
    generateColor() {
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
        return `#${randomColor}`;
      };
    doLettersValue() {
        var x = windowSize.width / 4
        var r = Math.floor(Math.random() * this.state.unusedLetters.length);
        // alert("r1:"+r)
        var length = this.state.word.length
        // console.log('length');
        if (this.state.unusedLetters.length > 14) {
            // alert("used:"+this.state.unusedLetters.length);
            if ((length + 1) % 3 == 0 || length == 0) {
                var r = Math.floor(Math.random() * this.state.Vowels.length);
                // console.log("unusedLetters:" + this.state.unusedLetters)
                var c = this.state.unusedLetters.splice(r, 1);
                var c = this.state.Vowels.splice(r, 1);
                this.state.usedLetters.push(c);
                // console.log("C$$$:" + c)
                this.doAddLetters(c);
            } else {
                var r = Math.floor(Math.random() * this.state.Consonants.length);
                // console.log("unusedLetters:" + this.state.unusedLetters)
                var c = this.state.unusedLetters.splice(r, 1);
                var c = this.state.Consonants.splice(r, 1);
                // console.log("C$$$:" + c)
                this.state.usedLetters.push(c);
                this.doAddLetters(c);
            }
        }
    }
    displayTimer(seconds) {
        var minutes = parseInt(seconds / 60);
        if (minutes < 10) { minutes = "0" + minutes }
        var secondsRemaining = parseInt(seconds % 60);
        if (secondsRemaining < 10) { secondsRemaining = "0" + secondsRemaining }
        this.setState({
            msInterval: minutes
        })
        return minutes + ':' + secondsRemaining;
    }

    doReset() {
        this.state.currentSeconds = 0;
        this.state.currentMinutes = 0;
        this.state.sTimestamp = 0;
        this.state.lettersTimestamp = this.state.currentSpeed - 1; // start letters right away
        this.state.currentLetters = '';
        this.state.unusedLetters = [];
        this.state.usedLetters = [];
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 26; ++i) {
            this.state.unusedLetters.push(alphabet[i]);
        }
    }

    check() {
        var self = this
        if (this.state.word.length == 12) {
            this.setState({
                disabled: true
            }, () => {
                self.endGame()
            })

        }
    }

    doAddLetters(c) {
        var str = c;
        var word = this.state.word;
        var self = this
        word.push(str)
        if (this.state.word.length > 11) {
            if (this.state.Level == "Advanced") {
                timer = setTimeout(function () {
                    if (word.length == 12) {
                        self.setState({
                            disabled: true
                        })
                        self.endGame()
                    }
                }, 3000);
            } else if (this.state.Level == "Intermediate") {
                timer = setTimeout(function () {
                    if (word.length == 12) {
                        self.setState({
                            disabled: true
                        })
                        self.endGame()
                    }
                }, 5000);
            } else if (this.state.Level == "Pro") {
                timer = setTimeout(function () {
                    if (word.length == 12) {
                        self.setState({
                            disabled: true
                        })
                        self.endGame()
                    }
                }, 1500);
            }
            else {
                timer = setTimeout(function () {
                    if (word.length == 12) {
                        self.setState({
                            disabled: true
                        })
                        self.endGame()
                        // this.endGame()
                    }
                }, 7000);
            }
        } else {
            this.setState({ word: word })
        }
    }

    
    isLegalChar(charCode) {
        return this.state.usedLetters.join('').indexOf(charCode) != -1;
    }

    renderTiles() {
       
        var result = [];
        
        var i = 0;
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 4; col++) {
                var key = row * SIZE + col;
                var letter = this.state.word
                console.log("array%%%%%%%:" + (row * SIZE + col))
                var position = {
                    left: col * CELL_SIZE,
                    top: row * CELL_SIZE 
                };
                result.push(
                    <Card>
                    <TouchableOpacity disabled={this.state.disabled} key={key} onPress={this.press.bind(this, letter[i])} style={[styles1.gridBox, position]}>
                        <Text allowFontScaling={false} style={styles.letter}>{letter[i]}</Text>
                    </TouchableOpacity>
                    </Card>
                );
                i++
            }
        }
        return result
    }
    press(data, row, col) {
        // console.log(data);
        if (data != undefined) {
            this.setState({ value: this.state.value + data })
        }

    }
    
    wrongWord() {
        { windowSize.width == 1906 ? (height = windowSize.height / 2) : windowSize.width == 375 ? (height = windowSize.height / 2.62) : (height = windowSize.height / 2.4) }
        return {
            fontSize: WIDTH,
            textAlign: 'center',
            height: height,
            color: 'red',
            justifyContent:'center',
            alignItems:'center'
           
            
        }
    }
    clear() {
        //     console.log(this.state.value, "value");
        var value = this.state.value.slice(0, -1)
        this.setState({ value: value })
    }

    handleSubmit() {

        if(!this.state.animated){
            var count = 0;
            var word = 0;
            var count1 = this.state.count;
            var words = this.state.word
            var fakeCount = count1
            var correct = this.state.correctWords
            var Incorrect = this.state.incorrectWords
            var wrong = this.state.incorrectWords
            this.setState({
                wrong: wrong,
                visibleCross:true
            })
            this.state.value
            for (var i = 0, n = words.length; i < n; i++) {
                for (var j = 0, m = this.state.value.length; j < m; j++) {
                    if (words[i] == this.state.value[j]) {
                        word = word + 1
                    }
                }
            }
            if (word == this.state.value.length) {

                var text=this.state.value.toUpperCase()

                var results = Word8.filter(Word=>Word==text)
                
                
                    if (results.length != 0) {
                         
                        this.success()
                      
                    }
                    else {
                        this.fail()
                    }
               
              
            }
            else {
                this.setState({ wrong: 'yes' });
                if (this.state.currentWord != "") {
                    Incorrect.push(this.state.currentWord);
                }
                setTimeout(() => {
                    this.setState({ incorrectWords: Incorrect })
                    this.setState({ currentWord: '', wrong: Incorrect })
                }, 300);
            }
        }
    }
    onYes() {

        var scoreArray = []
        var correct = this.state.correctWords
        var Incorrect = this.state.incorrectWords
        var time = this.state.timeDisplay
        var Level = this.state.Level
        var Name = this.state.Name
        var City = this.state.City
        var Points = this.state.Points
        var scores = this.state.Score
        var udId = this.state.uuid
       
        scoreArray.push({ "score": scores, "level": Level });
        axios({
        method:'post',
        url:('https://maxword.net/.netlify/functions/server/api/addUser'),
        data:({ 'name': Name, 'city': City, "udId": this.state.uuid, "scores": scoreArray }),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => {
    
                
                var userId = JSON.stringify(response.data.message._id)
                console.log(userId,'json')
                this.setState({
                    animated: false,
                    transparent: false,
                    visible: false,
                }, () => {
                    
                    this.props.navigation.navigate("End Game", { correct, time, Incorrect, Level, Name, Points, scores, userId, City, udId })
                })
            }).catch((err)=>{console.log(err)})
    }
    onNo() {
        var correct = this.state.correctWords
        var Incorrect = this.state.incorrectWords
        var time = this.state.timeDisplay
        var Level = this.state.Level
        var Name = this.state.Name
        var City = this.state.City
        var Points = this.state.Points
        var self = this
        var scores = this.state.Score
        this.setState({
            animated: false,
            transparent: false,
            visible: false,
        }, () => {
            this.props.navigation.navigate("End Game", { correct, time, Incorrect, Level, Name, Points, scores, City })
            
        })
    }
   
    
    render() {
        

        return (
             <Card style={{ flex: 1 ,backgroundColor:'#1B98F5'}}>
                <Header
                    showBack
                    onBackPress={() => this.props.navigation.navigate("Main")}
                    title={'MaxWord'}
                />

                <Card style={[styles.shadowProp,{backgroundColor:'#207398',borderWidth:1,borderColor:'black',borderBottomRightRadius:20,borderBottomLeftRadius:20,flex:0.15,marginBottom:10,marginHorizontal:15,borderTopLeftRadius:0,borderTopRightRadius:0}]}>
                <Card.Content style={[styles.headerRow,{justifyContent:'center',alignItems:'center'}]}>
                    <Card.Content style={{ height: 50,alignItems:'flex-start' }}>
                        <Text allowFontScaling={false} style={[styles.Correct,{fontSize:font_size}]}>Score:{this.state.Score}</Text>
                    </Card.Content>
                    <Card.Content style={{ height: 50,alignItems:'center'}}>
                        <Text allowFontScaling={false} style={[styles.Level,{fontSize:font_size}]}>{this.state.Level}</Text>
                    </Card.Content>
                    <Card.Content style={{  height: 50 ,alignItems:'flex-end' }}>
                        <Text allowFontScaling={false} style={[styles.Time,{fontSize:font_size}]}>Time: {this.state.timeDisplay}</Text>
                    </Card.Content>
                </Card.Content>
                </Card>

            <Card.Content style={{justifyContent:'center',alignItems:'center',backgroundColor:'#1B98F5',height:30,marginTop:20}}>
          <Card.Content>
          <Text style={{fontSize: 20}}>{this.state.value}</Text>
          </Card.Content>
          <View style={{height:1,width:'20%',backgroundColor:'black'}}></View>
          </Card.Content>
                
            <Card.Content style={{flex:1,backgroundColor:'White',marginTop:20,justifyContent:'center',alignItems:'center'}}>
            <Card.Content  style={{flex:1,padding:0,justifyContent:'center'}}>
            
            <FlatList
            
            data={this.state.word}
            
            renderItem={({ item }) => 
            
            <TouchableOpacity  disabled={this.state.disabled}  onPress={this.press.bind(this, item)}>
            <Card.Content style={styles1.gridBox} >
            <Text style={styles1.GridViewTextLayout} >
            {item}
            </Text>
            </Card.Content>
            </TouchableOpacity>
            
            }
            numColumns={4}
            
            />
            
            </Card.Content>
            {this.state.wrong == 'yes' ? (
                
                <Modal visible={this.state.visibleCross} 
                style={{ justifyContent:'center',alignItems:'center',backgroundColor: 'transparent'}}>
                    <Text allowFontScaling={false} style={this.wrongWord()}>X</Text>
                </Modal>
               ) : (
                <View></View>
            )}

            
           
          </Card.Content>
          
          

          

          
          <Card.Content style={{flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
              <TouchableOpacity disabled={this.state.disabled} style={{flex:0.5,marginRight:3,marginLeft:3,marginTop:20,height:80,width:WIDTH+20,backgroundColor:'#495159',borderRadius:15,marginBottom:10,}} onPress={this.clear.bind(this)}>
                <Text allowFontScaling={false} style={styles.Text}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={this.state.disabled} style={{flex:0.5,marginRight:3,marginLeft:3,marginTop:20,height:80,width:WIDTH+20,backgroundColor:'#495150',borderRadius:15,marginBottom:10,}} onPress={this.handleSubmit.bind(this)}>
                <Text allowFontScaling={false} style={styles.Text}>Submit</Text>
              </TouchableOpacity>
            </Card.Content>
            
            <Portal theme={{ colors: { backdrop: 'rgba(0, 0, 0, 0.2)' } }}>
            <Modal visible={this.state.visible}
                //  onDismiss={hideModal}
                style={{ flex: 1, justifyContent: 'center' }}
                contentContainerStyle={{
                    backgroundColor: 'transparent',
                    width: '85%',
                    height: '100%',
                    alignSelf: 'center',
                    
                }}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>
                    <View style={{ marginTop: windowSize.height / 3, marginHorizontal: 10 }}>
                        <View style={{ height: windowSize.height / 8, backgroundColor: 'white', }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 15 }}>Do you want to post your score to our site?</Text>
                            </View>
                        </View>
                        <View style={{ height: 50, }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 0.5, backgroundColor: '#27ae61' }} onPress={this.onYes.bind(this)} key={this.state.uuid} >
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>YES</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.5, backgroundColor: '#34475d' }} onPress={this.onNo.bind(this)}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text allowFontScaling={false} style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>NO</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
        </Card>
        )
    }
};

function removeDuplicateCharacters(string) {
    var promise = new Promise(function (resolve, reject) {
        var unique = '';
        for (var i = 0; i < string.length; i++) {
            if (unique.indexOf(string[i]) == -1) {
                unique += string[i];
            }
        }
        resolve(unique)
    })
    return promise;
}



export default Play;

const styles1 = StyleSheet.create({
    
    GridViewContainer: {
     flex:1,
     
     height: 100,
     margin: 5,
     backgroundColor: '#7B1FA2'
  },
  GridViewTextLayout: {
     fontSize: 30,
     fontWeight: 'bold',
     justifyContent:'center',
     alignItems:'center',
     color: '#fff',
     padding: 10,
   },
   gridBox:{
    margin:4,
    width:WIDTH,
    justifyContent:'center',
    alignItems:'center',
    height:height/5,
    backgroundColor:"#23C4ED",
    position:'relative',
    borderRadius: 10,
    borderWidth:1,
   },
flatlist:{
    position:'relative',
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row'
}
  });