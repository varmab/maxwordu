var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
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
  Dimensions,TouchableWithoutFeedback,
  Linking,AppRegistry
} from 'react-native'
import Modal from 'react-native-modalbox';

var windowSize = Dimensions.get('window');
// var MyScore = require('./MyScores');
// var endGame = require('./endGame');
// var TimerMixin = require('react-timer-mixin');
//var Words = require('./;
var dismissKeyboard = require('dismissKeyWord');
// var GLOBAL = require('./Globals')board');
//var  getCorrectFontSizeForScreen = require('./multiResolution');
var DeviceInfo = require('react-native-device-info');
// var SQLite = require('react-native-sqlite-storage');
// import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';
// var Modal   = require('react-native-modalbox');
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
// let tracker = new GoogleAnalyticsTracker('UA-86654723-1');
// import moment from 'moment';

tracker.trackScreenView('Play Now');

var height = windowSize.width/1.3
var SIZE = 4; // four-by-four grid
var Cell = windowSize.width * .2
var CELL_SIZE = windowSize.width/4; // 20% of the screen width
var CELL_PADDING = 0 // 5% of the cell size
var BORDER_RADIUS = CELL_PADDING * 2;
var TILE_SIZE = CELL_SIZE - CELL_PADDING * 2;
var LETTER_SIZE = Math.floor(TILE_SIZE * .75);
var rows =[0,1,2]
var columns = [0,1,2,3]
var id = [0,1,2,3,4,5,6,7,8,9,10,11]
var dupValue = []
var dupValue1 = []

var FONT   = 16;
var Margin = 8;

var styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
    backgroundColor:'white'
  },
  letter:{
    fontSize:60
  },
  header: {
    flex:.06
  },
  body:{
    flex:.52,
  },
  bodyIphone5:{
    flex:.44
  },
  bodyAndroid:{
    flex:.46
  },
  bodyIphone6plus:{
    flex:.55
  },
  footerIphone5:{
    flex:.5,
    width: windowSize.width,
    height: windowSize.height
  },
  footerAndroid:{
    flex:.48,
    width: windowSize.width,
    height: windowSize.height
  },
  footerIphone6plus:{
    flex:.4,
    width: windowSize.width,
    height: windowSize.height
  },
  footer:{
    flex:.42,
    width: windowSize.width,
    height: windowSize.height
  },
  thumbnail: {
    height: 250
  },
  subContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    marginTop: 8,
  },
  year: {
    marginTop: 12,
    marginLeft: 8,
  },
  row:{
    flex:1.5,
    flexDirection:'row'
  },
  subRow:{
    marginLeft: 2.5,
    marginRight: 2,
    flex:1.5,
    height: 40,
    padding: 5,
    borderRadius:2,
    flex:0.5,
    backgroundColor:'#495159'
  },
  subRow1:{
    marginLeft: 2.5,
    flex:1.5,
    height: 40,
    padding: 5,
    borderRadius:2,
    flex:0.5,
    backgroundColor:'#27ae61'
  },
  Text:{
    textAlign:'center',
    marginTop: 30,
    fontSize:17,
    fontWeight:'bold',
    color:'white'
  },
  textHeader:{
    paddingTop:20,
    paddingLeft:20,
    fontSize:20,
    fontWeight:'bold',
  },
  textBody:{
    paddingTop:5,
    paddingLeft:20,
    fontSize:17
  },
  textfooter:{
    paddingTop:5,
    paddingLeft:20,
    fontSize:17
  },
  Correct:{
    flex:.20,
    fontSize:FONT,
    fontWeight:'bold',
    marginTop:10,
    paddingLeft:8
  },
  Level:{
    flex:.40,
    fontSize:FONT,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:10
  },
  Time:{
    flex:.40,
    fontSize:FONT,
    fontWeight:'bold',
    marginTop:10
  },
  headerRow:{
    paddingTop:5,
    flexDirection:'row'
  },
  subBody:{
    flex:.38,
    borderBottomColor: 'black',
  },
  subBodyIphone5:{
    flex:.30,
    borderBottomColor: 'black',
  },
  subBodyAndroid:{
    flex:.36,
    borderBottomColor: 'black',
  },
  subBodyIphone6plus:{
    flex:.45
  },
  subBodyText:{
    flex:.10
  },
  subBodyTextIphone5:{
    flex:.08
  },
  subBodyTextAndroid:{
    flex:.10
  },
  subBodyTextIphone6plus:{
    flex:.10
  },
  Input:{
    marginTop: 5,
    flexDirection: 'row',
    height: 40,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  InputIphone5:{
    marginTop: 2,
    flexDirection: 'row',
    height: 33,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  InputAndroid:{
    marginTop: 3,
    flexDirection: 'row',
    height: 45,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  TextInput:{
    padding: 5,
    flex:.15,
    fontSize: 30,
    justifyContent:'center',
    color: 'black'
  },
  TextInputIphone5:{
    padding: 4,
    flex:.1,
    fontSize: 20,
    justifyContent:'center',
    color: 'black'
  },
  TextInputAndroid:{
    padding: 4,
    flex:.1,
    fontSize: 20,
    justifyContent:'center',
    color: 'black'
  },
  tile: {
    position: 'absolute',
    width:windowSize.width/4+2,
    height:height/3,
    borderRadius: 2,
    borderWidth:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2',
  },
  modal3: {
    height: 150,
    width: windowSize.width-50
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
 var timer;
var db = SQLite.openDatabase({name : "testDB5",createFromLocation : 1});
var Play = React.createClass({
  mixins: [TimerMixin],
   getInitialState() {
    return {
      timeElapsed: 0,
      timeDisplay: '',
      correctWords:[],
      incorrectWords: [],
      unusedLetters : this.props.gameWord,
      usedLetters : [],
      array:[],
     // Consonants:['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Z'],
      Vowels:['A','E','I','O','U','Y'],
      currentSpeed: 0,
      currentFont: GLOBAL.BASE.startFont,
      currentSeconds: 0,
      currentMinutes: 0,
      currentLetters: 0,
      msInterval : null,
      sInterval : null,
      sTimeout : null,
      lettersInterval : null,
      lettersTimeout : null,
      sTimestamp: 0,
      lettersTimestamp : this.currentSpeed - 1,
      maxWords: '',
      maxWord: '',
      isPaused: false,
      currentWord: '',
      word:[],
      gameWord:this.props.gameWord,
      pause:'Pause',
      Level:'Beginner',
      Name:'',
      City:'',
      value:'',
      Points:1,
      count:0,
      fakeCount:0,
      interval:{},
      autoCorrect:false,
      noSuggestions:true,
      autoFocus:true,
      Score:0,
      before:0,
      after:0,
      timeInterval:0,
      wrong:"No",
      arrayPosition:[],
      disabled:false,
      animated:false,
      transparent:false,
      visible:false,
      bannerSize: 'smartBannerPortrait'
    }
  },
  MyScore(){
    this.props.navigator.push({
      component: MyScore,
      title: 'My Scores',
    });
  },
  Options(){
    this.clearInterval(this.state.letterTimer)
    this.clearInterval(this.state.durationTimer)
    this.setState({
      maxWords:'',
      maxWord:'',
      Score:'',
      timeDisplay:''
    })
    var Options = require('./Options');
    this.props.navigator.push({
      name:'Options',
      component: Options,
      title: 'Options',
    });
  },
  sucess(){
    clearTimeout(timer);
    var count1 = this.state.count;
    var words = this.state.words
    var fakeCount = count1
    var correct = this.state.correctWords
    this.doRemoveLetters(this.state.value)
      count1 = count1+1;
      Score = this.state.Score+this.state.value.length*this.state.Points
      correct.push(this.state.value);
      this.setState({correctWords:correct})
      this.setState({currentWord:'',count:count1,Score:Score,fakeCount:fakeCount})
  },
  fail(){
    var Incorrect = this.state.incorrectWords
    var wrong = this.state.incorrectWords
    this.setState({
      wrong:wrong
    })
    this.setState({wrong:'yes'});
      if(this.state.value != "") {
            Incorrect.push(this.state.value);
      }
      setTimeout(() => {
        this.setState({incorrectWords: Incorrect})
        this.setState({value: '',wrong:Incorrect})
      }, 300);
  },
  handleSubmit() {
    if(!this.state.animated){
      var unique = ''
      var count = 0;
    var word = 0;
    var count1 = this.state.count;
    var words = this.state.word
    for(var i=0; i<words.length; i++){
        if(unique.indexOf(words[i])==-1){
            unique += words[i];
        }
    }
    var fakeCount = count1
    var correct = this.state.correctWords
    var Incorrect = this.state.incorrectWords
    var wrong = this.state.incorrectWords
    this.setState({
      wrong:wrong
    })
    this.state.value
    console.log("current:"+this.state.currentWord);
   //  words.replace(/(.)(?=.*\1)/g, "")
   
    for (var i = 0, n = unique.length; i < n; i++) {
        for (var j = 0, m = this.state.value.length; j < m; j++) {
          if(unique[i] == this.state.value[j]){
            word = word+1
          }
        }
    }
    if(word == this.state.value.length){
     // alert("value:"+this.state.value)
        db.executeSql('SELECT * FROM maxwords8 WHERE words =='+"\""+this.state.value+"\"", [], (results) => {
          if(results.rows.length != 0){
            this.sucess()
          }
          else{
            this.fail()
          }
        },(error)=>{
          console.log("error:"+JSON.stringify(error))
        })
    }
    else{
      this.setState({wrong:'yes'});
      if(this.state.currentWord != "") {
            Incorrect.push(this.state.currentWord);
      }
      setTimeout(() => {
        this.setState({incorrectWords: Incorrect})
        this.setState({currentWord: '',wrong:Incorrect})
      }, 300);
    }
    }
  },
  endGame(){
     // this.model()
     //alert("end")
     this.setState({
      animated:true,
       transparent:true,
       visible:true,
     })
      this.clearInterval(this.state.letterTimer)
      this.clearInterval(this.state.durationTimer)
  },
  model(id){
    this.refs.modal3.open();
  },
  onOk(){
    this.refs.modal3.close();
  },
  tick(){
    this.doLetters();
  },
  componentDidMount(){
   // alert("level:"+this.state.Level)
    // AdMobInterstitial.setTestDeviceID('EMULATOR');
    // AdMobInterstitial.setAdUnitID('ca-app-pub-7238183882077023/2286757396');

    // AdMobInterstitial.addEventListener('interstitialDidLoad',
    //   () => console.log('interstitialDidLoad event'));
    // AdMobInterstitial.addEventListener('interstitialDidClose',
    //   this.interstitialDidClose);
    // AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
    //   () => console.log('interstitialDidFailToLoad event'));
    // AdMobInterstitial.addEventListener('interstitialDidOpen',
    //   () => console.log('interstitialDidOpen event'));
    // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
    //   () => console.log('interstitalWillLeaveApplication event'));

    // AdMobInterstitial.requestAd((error) => error && console.log(error));
this.setState({uuid:DeviceInfo.getUniqueID()})
    AsyncStorage.getItem("Name").then((value) =>{
      this.setState({Name:value})
    }).done();
    AsyncStorage.getItem("City").then((value) =>{
      this.setState({City:value,Level:this.props.Level})
    //  this.setState({})
   // }).done();

   /* AsyncStorage.getItem("Level").then((value) =>{
      if(value != null){
        this.setState({Level:value})
      }*/
    }).done(function(){
          var timeInterval=GLOBAL.LEVELS[1].startSpeed;
        //  if(this.state.Level == 'Intermediate'){
          //  alert("Intermediate:"+this.state.Level)
            this.setState({Points:2,timeInterval:GLOBAL.LEVELS[1].startSpeed})
            timeInterval=GLOBAL.LEVELS[1].startSpeed;
        //  }
          this.doReset();
          this.tick();
          this.state.letterTimer = setInterval(this.tick, timeInterval);
           this.state.durationTimer = this.setInterval (()=> {
              this.setState({
                timeElapsed: this.state.timeElapsed + 1,
                timeDisplay: this.displayTimer(this.state.timeElapsed + 1)
              })
          },1000);
    }.bind(this));

  },
  componentWillUnmount: function() {
    AdMobInterstitial.removeAllListeners();

    this.clearInterval(this.state.letterTimer)
    this.clearInterval(this.state.durationTimer)
  },
  worngWord: function() {
    {windowSize.width == 320 ? (height=windowSize.height/3.2):windowSize.width == 375 ?(height=windowSize.height/2.62):(height=windowSize.height/2.4)}
    return {
      fontSize:  windowSize.width/2,
      textAlign:'center',
      height:height,
      color:'red'
    }
  },
  doLetters: function() {
   // alert("lettsers")

   var letter = 0 ;
   var count = 0 ;
    var x = windowSize.width/4
    //var r = this.state.gameWord.charAt(0);
   // alert("length:"+this.state.unusedLetters.length)
    if(this.state.unusedLetters.length > this.state.gameWord.length-12){
     // alert("alert")
     // var c = str.charAt(0);
     var c = this.state.unusedLetters[letter];
     for (var i = 0, n = this.state.word.length; i < n;i++) {
          if(this.state.word[i] == c){
            letter = letter+1
            c = this.state.unusedLetters[letter];
            i = 0
          }
          /*else{
            i++
          }*/
     }
     /*this.state.word.map((res,i)=>{
      if(res == c){
        letter = letter+1
        c = this.state.unusedLetters[letter];
      }
     })*/
     if(count == 0){
       c = this.state.unusedLetters.splice(letter, 1);
      this.state.usedLetters.push(c);
      this.doAddLetters(c);
    }
      //removeDuplicateCharacters().then((responseData)=>{
      /*for (var i = 0, n = this.state.length; i < n; ++i) {
        var c = responseData.charAt(i);
        //  alert("c:"+c)
        this.state.word.map((res,i)=>{
          if(res == c){
          }
        })
      }*/
    //  var c = this.state.unusedLetters.splice(letter, 1);
    //  alert("hello:"+c)
     // alert("c:"+c)
     // this.state.usedLetters.push(c);
     // this.doAddLetters(c);
    }
    //var r = Math.floor(this.state.unusedLetters.length);
   // var length = this.state.gameWord.length
   /* if(this.state.unusedLetters.length > this.state.gameWord.length-12){
      var c = this.state.unusedLetters.splice(r, 1);
      /*if((length+1)%3 == 0 || length == 0){
        var r = Math.floor(Math.random() * this.state.Vowels.length);
        var c = this.state.unusedLetters.splice(r, 1);
        var c = this.state.Vowels.splice(r, 1);
        this.state.usedLetters.push(c);
        this.doAddLetters(c);
      }else{
        var r = Math.floor(Math.random() * this.state.Consonants.length);
        var c = this.state.unusedLetters.splice(r, 1);
        var c = this.state.Consonants.splice(r, 1);
        this.state.usedLetters.push(c);
        this.doAddLetters(c);
      }*/
   // }
  },
  displayTimer: function(seconds) {
    var minutes = parseInt(seconds / 60);
    if (minutes < 10) {minutes = "0" + minutes}
    var secondsRemaining = parseInt(seconds % 60);
    if (secondsRemaining < 10) {secondsRemaining = "0" + secondsRemaining}
      this.setState({
        msInterval:minutes
      })
    return minutes + ':' + secondsRemaining;
  },
  doReset: function() {
    this.state.currentSpeed = GLOBAL.BASE.startSpeed;
    this.state.currentFont = GLOBAL.BASE.startFont;
    this.state.currentSeconds = 0;
    this.state.currentMinutes = 0;
    this.state.sTimestamp = 0;
    this.state.lettersTimestamp = this.state.currentSpeed - 1; // start letters right away
    this.state.currentLetters = '';
    this.state.unusedLetters = [];
    this.state.usedLetters = [];
    var alphabet = this.props.gameWord;
    for (var i = 0; i < this.props.gameWord.length; ++i) {
      this.state.unusedLetters.push(alphabet[i]);
    }
  },
  check(){
   var self = this
    if(this.state.word.length == 12){
       this.setState({
            disabled:true
          },()=>{
            self.endGame()
          })
          
    }
  },
  doAddLetters: function(c) {
  //  alert("c:"+c)
    var str = c;
    var word =this.state.word;
    var self = this
    word.push(str)
    this.setState({word:word})
    if(this.state.word.length > 11 ){
       timer = setTimeout(function(){
        if(word.length == 12 ){
          self.setState({
            disabled:true
          })
          self.endGame()
        }
      }, 5000);
     }
  },
  getLetters: function(c) {
    var str = '';
    for (var i = 0, n = GLOBAL.BASE.numLetters; i < n; ++i) {
      str += c;
    }
    return str;
  },
  isLegalChar: function(charCode) {
    return this.state.usedLetters.join('').indexOf(charCode) != -1;
  },
  doRemoveLetters: function(word) {
    this.setState({
      before:this.state.word.length
    })
    removeDuplicateCharacters(word).then((responseData)=>{
      var Vowels =['A','E','I','O','U','Y'];
      for (var i = 0, n = responseData.length; i < n; ++i) {
        var c = responseData.charAt(i);
      //  alert("c:"+c)
        this.state.word.map((res,i)=>{
          if(res == c){
            this.state.word.splice(i,1);
            this.state.usedLetters.splice(c, 1);
            this.state.unusedLetters.push(c);
          }
        })
        this.setState({
          value:''
        })
       /* if(Vowels.indexOf(c) == -1){
          this.state.usedLetters.splice(c, 1);
          this.state.unusedLetters.push(c);
          this.state.Consonants.push(c);
        }*/
        
        //}
      }
    })
  },
  change(data){
    if(this.state.pause == 'Pause'){
      this.doPause(data);
    }else{
      this.doResume();
    }
  },
  press(data,row,col){
    if(data != undefined){
      this.setState({value:this.state.value+data})
    }
  },
 renderTiles() {
    var result = [];
    var col=[0,1,2,3]
    var row =[0,1,2]
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
          <TouchableOpacity disabled={this.state.disabled} key={key} onPress={this.press.bind(this,letter[i])} style={[styles.tile, position]}>
           <Text allowFontScaling={false} style={styles.letter}>{letter[i]}</Text>
          </TouchableOpacity>
        );
        i++
      }
    }
    return result
  },
 
  clear(){
   var value = this.state.value.slice(0,-1)
   this.setState({value:value})
  },
  onYes(){
    
    var scoreArray =[]
    var correct = this.state.correctWords
    var Incorrect = this.state.incorrectWords
    var time = this.state.timeDisplay
    var Level1 = "gameOfTheDay"
    var Level = this.state.Level
    var Name = this.state.Name
    var City = this.state.City
    var Points = this.state.Points
    var scores = this.state.Score
    var udId = this.state.uuid
    var playedGameDate = moment().format('YYYY-MM-DD')
    scoreArray.push({"score": scores, "level": Level1});
    fetch('https://maxwords.herokuapp.com/api/addUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'name':Name,'city':City,"udId":this.state.uuid,"scores": scoreArray,"playedGameDate":playedGameDate})
    }).then((response) => response.json())
      .then((responseData) => {
      console.log(JSON.stringify(responseData))
     var userId = responseData.message._id
     this.setState({
      animated:false,
       transparent:false,
       visible:false,
     },()=>{
      this.props.navigator.push({
        name:'End Game',
        component: EndGame,
        title: 'MaxWord',
        passProps: {correct, time, Incorrect, Level,Name,Points,scores,userId,City,udId}
      });
     })
    })
  },
  onNo(){

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
      animated:false,
       transparent:false,
       visible:false,
     },()=>{
       this.props.navigator.push({
          name:'End Game',
          component: EndGame,
          title: 'MaxWord',
          passProps: {correct, time, Incorrect, Level,Name,Points,scores,City}
      });
     })
  },
  render(){
    //alert("height:"+(windowSize.height/2.2-160))
    var height = windowSize.height/2.2
    return(
      <View style={styles.container}>
        {/* <View style={{width:windowSize.width,height:50}}>
         <View style={styles.headerRow}>
           <View style={{flex:.3,height:50}}>
           <Text allowFontScaling={false} style={styles.Correct}>Score:{this.state.Score}</Text>
           </View>
           <View style={{flex:.4,height:50,justifyContent:'center',alignSelf:'center'}}>
           <Text allowFontScaling={false} style={styles.Level}>{this.state.Level}</Text>
           </View>
           <View style={{flex:.30,height:50}}>
           <Text allowFontScaling={false} style={styles.Time}>Time: { this.state.timeDisplay }</Text>
           </View>
          </View>
        </View> */}
          {/* <View style={{width:windowSize.width,height:windowSize.width*3/3.9}}>
            <View style={{flex:1}}>
             {this.renderTiles()}
            </View>
            {this.state.wrong=='yes' ?(
              <View style={{backgroundColor:'transparent'}}>
                <Text allowFontScaling={false} style={this.worngWord()}>X</Text>
              </View>):(
              <View></View>
              )}
          </View> */}
        {/* <View style={{width:windowSize.width,height:windowSize.height/2.2}}>
          <View style={{width:windowSize.width,height:40,flexDirection:'row'}}>
           <View style={{marginTop:20,height:50,width:windowSize.width,justifyContent:'center',alignSelf:'center'}}>
            <Text allowFontScaling={false} style={{textAlign:'center',fontSize:25}}>{this.state.value}</Text>
           </View>
          </View>
          <View style={{width:windowSize.width,height:80}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginRight:3,marginLeft:3,marginTop:20,height:80,width:windowSize.width/2.05,backgroundColor:'#495159'}} onPress={this.clear}>
                <Text allowFontScaling={false} style={styles.Text}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={this.state.disabled} style={{marginRight:3,marginLeft:3,marginTop:20,height:80,width:windowSize.width/2.1,backgroundColor:'#495159'}} onPress={this.handleSubmit}>
                <Text allowFontScaling={false} style={styles.Text}>Submit</Text>
              </TouchableOpacity>
            </View>
            {windowSize.width != 768 ? (
              <View style={{height:windowSize.height/2.2-230}}></View>
              ):(
              <View style={{height:70}}></View>
              )}
            <View style={{height:40}}>
              <AdMobBanner
                  bannerSize={this.state.bannerSize}
                  testDeviceID="EMULATOR"
                  adUnitID="ca-app-pub-7238183882077023/2286757396"/>
            </View>
          </View>
        </View> */}
        {/* <Modal  animated={this.state.animated}
          animationType={"slide"}
          transparent={this.state.transparent}
          visible={this.state.visible}>
            <View style={{flex:1,backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <View style={{marginTop:windowSize.height/3}}>
              <View style={{height:windowSize.height/5,backgroundColor:'white',marginRight:10,marginLeft:10}}>
                <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                  <Text allowFontScaling={false} style={{textAlign:'center',fontSize:15}}>Do you want to post your score to our site?</Text>
                </View>
              </View>
              <View style={{height:50,marginRight:10,marginLeft:10}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <TouchableOpacity style={{flex:0.5,backgroundColor:'#27ae61'}} onPress={this.onYes.bind(this)}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Text allowFontScaling={false} style={{color:'white',textAlign:'center',fontSize:20}}>YES</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:0.5,backgroundColor:'#34475d'}} onPress={this.onNo.bind(this)}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Text allowFontScaling={false} style={{color:'white',textAlign:'center',fontSize:20}}>NO</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
            </View>
          </Modal> */}
      </View>
      )
  }
});

function removeDuplicateCharacters( string ){
  var promise= new Promise(function(resolve,reject){
    var unique='';
    for(var i=0; i<string.length; i++){
        if(unique.indexOf(string[i])==-1){
            unique += string[i];
        }
    }
    resolve (unique)
  })
  return promise;
}
module.exports = Play;
