import React, { useState } from 'react'
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
    Keyboard
} from 'react-native'
import Modal from 'react-native-modalbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import styles from './../Styles/homeStyle'
import { Card } from 'react-native-paper';
import Header from './Header';
import env from '../../env'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/FontAwesome'


const { width, height } = Dimensions.get('window');
var windowSize = Dimensions.get('window');
console.log(windowSize.height,'sizeheight @@@@@');
var FONT   = 17;
var font = 20;
var Margin = 28;
var Font_main=70
var icon_size=35
if(windowSize.width >400){
  FONT   = 30,
  Margin = 40 , 
  Font_main=70,
  icon_size=40 
}if(windowSize.width < 350){
  font = 18,
  Font_main=50,
  icon_size=30
}

const play_icon = (
    <Icon name="play" size={icon_size} color="white"/>)

const option_icon = (
    <Icon name="bars" size={icon_size} color="white"/>)

const help_icon = (
    <Icon name="question" size={icon_size} color="white"/>)


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', City: '', uuid: '', Level: 'Beginner', Show: false };
        this.refs = React.createRef();
        

    }
    UNSAFE_componentWillMount() {
        this.setState({count:this.state.count+1})
        AsyncStorage.getItem("uuid").then((value) => {
            this.setState({
                uuid: value
            })
        })
    }
    UNSAFE_componentDidMount() {
       
        AsyncStorage.getItem("Name").then((value) => {
            this.setState({ "Name": value })
           
        })
        AsyncStorage.getItem("City").then((value) => {
            this.setState({ "City": value })
        })
        AsyncStorage.getItem("Level").then((value) => {
            if (value == null || value == "null") {
                AsyncStorage.setItem("Level", 'Beginner')
            } else {
                this.setState({ "Level": value })
                this.setState({count:this.state.count+1})
            }
        })
    }
    start() {
        if (this.state.uuid == null || this.state.uuid == "null" || this.state.uuid == null) {
            this.setState({ Show: true })
        }
        else if ( this.state.Name == null &&
          this.state.Name == "null" &&
          this.state.Name == "" &&
          this.state.City == null &&
          this.state.City == "null" &&
          this.state.City == "") {
            this.model()
        } else {
            
            this.props.navigation.navigate('PlayNow');
            
        }
    }
    option() {
        
        this.props.navigation.navigate('Options');
    }
    model(id) {
        this.refs.modal3.open();
    }
    onOk() {
        this.refs.modal3.close();
    }
    close() {
        if (this.state.Name == null || this.state.Name == "null" || this.state.Name == '' ||
            this.state.Name == undefined) {
            Alert.alert('MaxWord', 'Please enter name', [{ text: 'OK' }]);
        } else
            if (this.state.City == null || this.state.City == "null" || this.state.City == "") {
                Alert.alert('MaxWord', 'Please enter city', [{ text: 'OK' }]);
            } else {
                AsyncStorage.setItem("uuid", getUniqueId())
                this.setState({
                    uuid: getUniqueId(),
                    Show: false
                }, () => {
                   
                    this.props.navigation.navigate('PlayNow');
                })
            }
    }
    model1(id) {
        this.refs.modal4.open();
    }
    handleChange(name, e) {
        if (name == 'Name') {
            AsyncStorage.setItem("Name", e.nativeEvent.text)
            this.setState({
                Name: e.nativeEvent.text
            })
        } else {
            AsyncStorage.setItem("City", e.nativeEvent.text)
            this.setState({
                City: e.nativeEvent.text
            })
        }
    }

    help() {
        
        this.props.navigation.navigate("Help")
    }
    
    inputFocused(refName) {
        
       
        if (refName == 'Name') {
            if (windowSize.width >=340) {
                let scrollResponder = this.refs.scrollView.getScrollResponder();
                scrollResponder.scrollTo({ y: windowSize.height / 3 })
            }
        } else {
            if (windowSize.width < 340) {
                let scrollResponder = this.refs.scrollView.getScrollResponder();
                scrollResponder.scrollTo({ y: windowSize.height / 2.3 })
            }
        }

    }
    render() {
      if(this.state.Show){ 
        return (
          
          <Card style={{ flex: 1 }}>
            
           
              <View style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView
                  // ref={scrollRef}
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
                      To play, simply tap on available letters to form words
                      before the tiles fill up. If the word is correct, the
                      letters disappear. A letter can be used more than once,
                      and longer words score higher; “BANANA” scores higher than
                      “BAN”. After all the tiles are filled, you have a few
                      seconds to submit a word or the game ends. There are three
                      levels of play to choose from. Name and City is requested
                      for the leaderboard.
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
                    <TextInput
                      allowFontScaling={false}
                      style={styles.textInput}
                      placeholder="Name"
                      value={this.state.Name}
                      placeholderTextColor={"#c0c0c0"}
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
                      placeholderTextColor={"#c0c0c0"}
                      // value={loginDetails.city}
                      returnKeyType="done"
                      onFocus={this.inputFocused.bind(this, "City")}
                      onSubmitEditing={(event) => {
                        this.close();
                      }}
                      onChange={this.handleChange.bind(this, "City")}
                      // onChangeText={text => {
                      //     onChangeData(text, 'city');
                      // }}
                    />
                    <TouchableOpacity
                      onPress={this.close.bind(this)}
                      style={{
                        height: 40,
                        marginTop: 30,
                        marginLeft: width / 4,
                        marginRight: width / 4,
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
              </Card>)
              }else{
              return(
              <View style={styles.container}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize:Font_main, fontWeight: "bold" ,fontStyle:'italic',color:'#495150'}}
                  >
                    MaxWord
                  </Text>
                </View>
                <View style={{ flex: 0.1 }}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 18, textAlign: "center" }}
                  >
                    a quick escape for word game lovers
                  </Text>
                </View>
                <View
                  style={[
                    styles.imageBody,
                    {
                      height: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Image
                    style={styles.logo}
                    source={require("../img/MWicon.png")}
                  />
                </View>
                <View>
                  <Text style={styles.version_text}>
                    Version {env.APP_VERSION}
                  </Text>
                </View>




                <View style={styles.button}>
                  <View>
                    <TouchableOpacity onPress={this.start.bind(this)}>
                      <View style={styles.buttonParent}>
                        <LinearGradient
                          colors={['#848484', "#535353","#313131"]}
                          style={styles.buttonGrad}
                        >
                          {play_icon}
                          <Text style={styles.text_button}>PLAY</Text>
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
                    <TouchableOpacity onPress={this.help.bind(this)}>
                      <View style={styles.buttonParent}>
                        <LinearGradient
                          colors={['#848484', "#535353","#313131"]}
                          style={styles.buttonGrad}
                        >
                          {help_icon}
                          <Text style={styles.text_button}>HELP</Text>
                        </LinearGradient>
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
                  <View style={{ flex: 1, width: width - 50 }}>
                    <View style={{ flex: 0.8 }}>
                      <View style={{ justifyContent: "center" }}>
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
                        <TextInput
                          allowFontScaling={false}
                          style={styles.textInput}
                          placeholder="Name"
                          value={this.state.Name}
                          placeholderTextColor={"#c0c0c0"}
                          // value={loginDetails.name}
                          returnKeyType="next"
                          onSubmitEditing={(event) => {
                            this.refs.SecondInput.focus();
                          }}
                          onChange={this.handleChange.bind(this, "Name")}
                          // onChangeText={text => {
                          //     onChangeData(text, 'name');
                          // }}
                        />
                      </View>
                      <View>
                        <View>
                          <Text
                            allowFontScaling={false}
                            style={{
                              textAlign: "center",
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
                          placeholderTextColor={"#c0c0c0"}
                          // value={loginDetails.city}
                          value={this.state.City}
                          returnKeyType="done"
                          onSubmitEditing={(event) => {
                            Keyboard.dismiss;
                          }}
                          onChange={this.handleChange.bind(this, "City")}
                          // onChangeText={text => {
                          //     onChangeData(text, 'city');
                          // }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 0.2,
                        backgroundColor: "#013369",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity onPress={this.onOk.bind(this)}>
                        <View
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
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
            
       
    )
    }
  }
};

