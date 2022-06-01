// // import endGame from './endGame';



// // import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';

// // import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// // let tracker = new GoogleAnalyticsTracker('UA-86654723-1');
// // tracker.trackScreenView('Play Now');


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
    Alert,
    ScrollView,
    Dimensions,
    Platform,
} from 'react-native'
import styles from './../Styles/playStyles';
import { Card, Portal, Modal } from 'react-native-paper';
import Header from './Header';
//import Modal from 'react-native-modalbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerMixin from 'react-timer-mixin';
//import SQLite from 'react-native-sqlite-storage';

import GLOBAL from './Globals';
import axios from "axios";
import Words from '../../assets/Word1';




var windowSize = Dimensions.get('window');
var height = windowSize.width / 1.3
var SIZE = 4; // four-by-four grid
var Cell = windowSize.width * .2
var CELL_SIZE = 120; // 20% of the screen width
var CELL_PADDING =0 // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 5;
var LETTER_SIZE = Math.floor(TILE_SIZE * .75);
var rows = [0, 1, 2]
var columns = [0, 1, 2, 3]
var id = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]


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
            bannerSize: 'smartBannerPortrait'
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
        // console.log('lll');
        this.doLettersValue();
        // this.doRemoveLetters()
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
        // console.log("array%%%%%%%:" + this.state.word)
        var result = [];
        var col = [0, 1, 2, 3]
        var row = [0, 1, 2]
        var i = 0;
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 4; col++) {
                var key = row * SIZE + col;
                var letter = this.state.word
                var position = {
                    left: col * CELL_SIZE + CELL_PADDING,
                    top: row * CELL_SIZE + CELL_PADDING
                };
                result.push(
                    <TouchableOpacity disabled={this.state.disabled} key={key} onPress={this.press.bind(this, letter[i])} style={[styles.tile, position]}>
                        <Text allowFontScaling={false} style={styles.letter}>{letter[i]}</Text>
                    </TouchableOpacity>
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
        console.log(windowSize.width,windowSize.height),'wrongword function';
        { windowSize.width == 320 ? (height = windowSize.height / 3.2) : windowSize.width == 375 ? (height = windowSize.height / 2.62) : (height = windowSize.height / 2.4) }
        return {
            fontSize: windowSize.width / 2,
            textAlign: 'center',
            height: height,
            color: 'red',
           
            
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
                wrong: wrong
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

                var results = Words.filter(Word=>Word==text)
                
                
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
        url:('http://www.maxword.net/api/addUser'),
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
                    // this.props.navigator.push({
                    //     name: 'End Game',
                    //     component: endGame,
                    //     title: 'MaxWord',
                    //     passProps: { correct, time, Incorrect, Level, Name, Points, scores, userId, City, udId }
                    // });
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
            // this.props.navigator.push({
            //     name: 'End Game',
            //     component: endGame,
            //     title: 'MaxWord',
            //     passProps: { correct, time, Incorrect, Level, Name, Points, scores, City }
            // });
        })
    }
    render() {
        //alert("height:"+(windowSize.height/2.2-160))
        // var height = windowSize.height / 2.2
        return (
            <Card style={{ flex: 1 }}>
                <Header
                    showBack
                    onBackPress={() => this.props.navigation.navigate("Main")}
                    title={'MaxWord'}
                />
                <View style={styles.container}>
                    <View style={{ width: windowSize.width, height: 50 }}>
                        <View style={styles.headerRow}>
                            <View style={{ height: 50, marginLeft:'35%' }}>
                                <Text allowFontScaling={false} style={styles.Correct}>Score:{this.state.Score}</Text>
                            </View>
                            <View style={{ height: 50,textAlign:'center',marginLeft:'6.5%' }}>
                                <Text allowFontScaling={false} style={styles.Level}>{this.state.Level}</Text>
                            </View>
                            <View style={{  height: 50 ,marginLeft:'5.5%' }}>
                                <Text allowFontScaling={false} style={styles.Time}>Time: {this.state.timeDisplay}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width:"50%", height:"50%",marginLeft:'35.5%' }}>
                       <View style={{ flex: 1 }}> 
                            {this.renderTiles()}
                        </View>
                        {this.state.wrong == 'yes' ? (
                            <View style={{ backgroundColor: 'transparent' }}>
                                <Text allowFontScaling={false} style={this.wrongWord()}>X</Text>
                            </View>) : (
                            <View></View>
                        )}
                    </View>
                    <View style={{ width: windowSize.width, height: windowSize.height / 2.2 }}>
                        <View style={{ width: windowSize.width, height: 40, flexDirection: 'row' }}>
                            <View style={{ marginTop: 20, height: 50, width: windowSize.width , justifyContent: 'center', alignSelf: 'center', }}>
                                <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 25,marginRight:'3%' }}>{this.state.value}</Text>
                                <View style={{ height: 1, marginLeft:'35.5%', width: windowSize.width/4  , backgroundColor: 'black' }}></View>
                            </View>
                           
                        </View>
                        <View style={{ width: windowSize.width, height: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ borderRadius:20,marginRight: "5%", marginLeft: "27.5%", marginTop: '5%', height: 80, width: windowSize.width / 6, backgroundColor: '#495159' }}
                                    onPress={this.clear.bind(this)}>
                                    <Text allowFontScaling={false} style={styles.Text}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={this.state.disabled}
                                    style={{ borderRadius:20,marginRight: 3, marginLeft: "2%", marginTop: '5%', height: 80, width: windowSize.width / 6, backgroundColor: '#495159' }}
                                    onPress={this.handleSubmit.bind(this)}>
                                    <Text allowFontScaling={false} style={styles.Text}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                    </View>
                    <Portal theme={{ colors: { backdrop: 'rgba(0, 0, 0, 0.2)' } }}>
                        <Modal visible={this.state.visible}
                            //  onDismiss={hideModal}
                            style={{ flex: 1, justifyContent: 'center' }}
                            contentContainerStyle={{
                                backgroundColor: 'transparent',
                                width: '50%',
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
                </View>
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

//make this component available to the app
export default Play;
