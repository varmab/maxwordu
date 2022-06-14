import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { Component } from "react";
import { Card, Portal, TextInput } from "react-native-paper";
import Header from "./Header";
import styles from "./../Styles/optionsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUniqueId, getManufacturer } from "react-native-device-info";
var windowSize = Dimensions.get("window");

const { width } = Dimensions.get("window");
var FONT = 17;
var Margin = 38;
var textFont = 20;
var height = 80;
if (windowSize.width == 768) {
  (FONT = 30), (Margin = 50), (textFont = 20);
  height = 120;
} else if (windowSize.width == 320) {
  textFont: 18;
  height = 60;
}


export default class Options extends Component {
  constructor() {
    super();
    this.state = {
      Level: "Beginner",
      Name: "",
      City: "",
      uuid: "",
      Show: false,
      layer: false,
    };
    this.refs = React.createRef();
  }

  close() {
    var self = this;
    if (
      this.state.Name == null ||
      this.state.Name == "null" ||
      this.state.Name == ""
    ) {
      Alert.alert("MaxWord", "Please enter name", [{ text: "OK" }]);
    } else if (
      this.state.City == null ||
      this.state.City == "null" ||
      this.state.City == ""
    ) {
      Alert.alert("MaxWord", "Please enter city", [{ text: "OK" }]);
    } else {
      AsyncStorage.setItem("uuid", getUniqueId());
      this.setState(
        {
          uuid: getUniqueId(),
          Show: false,
        },
        () => {
          var Level = self.state.Level;
          var Name = self.state.Name;
          var City = self.state.City;
          // this.props.navigator.push({
          //   name: 'Play Now',
          //   component: Play,
          //   title: 'MaxWord',
          //   passProps: { Level: Level, Name: Name, City: City }
          // });
          this.props.navigation.replace("PlayNow", {
            Level: Level,
            Name: Name,
            City: City,
          });
        }
      );
    }
  }
  
  UNSAFE_componentWillMount() {
    AsyncStorage.getItem("Name").then((value) => {
      this.setState({ Name: value });
    });
    AsyncStorage.getItem("City").then((value) => {
      this.setState({ City: value });
    });
    AsyncStorage.getItem("Level").then((value) => {
      this.setState({ Level: value });
    });
    AsyncStorage.getItem("uuid").then((value) => {
      this.setState({
        uuid: value,
      });
    });
  }

  inputFocused(refName) {
    if (refName == "Name") {
      let scrollResponder = this.refs.scrollCard.Content.getScrollResponder();
      scrollResponder.scrollTo({ y: windowSize.height / 3 });
    } else {
      let scrollResponder = this.refs.scrollCard.Content.getScrollResponder();
      scrollResponder.scrollTo({ y: windowSize.height / 2.3 });
    }
  }

  handleChange(name, e) {
    if (name == "Name") {
      AsyncStorage.setItem("Name", e.nativeEvent.text);
      this.setState({
        Name: e.nativeEvent.text,
      });
    } else {
      AsyncStorage.setItem("City", e.nativeEvent.text);
      this.setState({
        City: e.nativeEvent.text,
      });
    }
  }

  select(value) {
    AsyncStorage.setItem("Level", value);
    this.setState({
      Level: value,
    });
  }

  play() {
    if (
      this.state.uuid == null ||
      this.state.uuid == "null" ||
      this.state.uuid == ""
    ) {
      this.setState({ Show: true });
    } else if (
      this.state.Name == null ||
      this.state.Name == "null" ||
      this.state.Name == "" ||
      this.state.City == null ||
      this.state.City == "null" ||
      this.state.City == ""
    ) {
      this.model();
    } else {
      var Level = this.state.Level;
      var Name = this.state.Name;
      var City = this.state.City;
      this.props.navigation.replace("PlayNow");
      
    }
  }
  home() {
    this.props.navigation.navigate("Main");
    
  }
  model(id) {
    this.refs.modal3.open();
  }
  onOk() {
    this.refs.modal3.close();
  }

  
  render() {
   
    return (
      <Card style={{ flex: 1 }}>
        <Header
          showBack
          onBackPress={() => this.props.navigation.navigate("Main")}
          title={"Options"}
        />
        {this.state.Show ? (
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.ScrollArea>
              <ScrollCard.Content contentContainerStyle={{paddingHorizontal: 24}}>
              <Text>This is a scrollable area</Text>
             </ScrollCard.Content>
          </Dialog.ScrollArea>
        </Dialog>
           
          </Portal>
        ):(
          <Card>
            <Card.Content style={styles.nameCard}>
              <Text>enter your Name: <TextInput
              style={{
                height: 60,
                width: windowSize.width / 6,
                marginLeft: 10,
                fontSize: textFont,
                justifyContent: "center",
                color: "black",
              }}
              placeholder="Name"
              value={this.state.Name}
              returnKeyType="next"
              onSubmitEditing={(event) => {
                this.refs.SecondInput.focus();
              }}
              onChange={this.handleChange.bind(this, "Name")}
              /></Text>
             
            </Card.Content>
            <Card.Content style={styles.cityCard}>
              <Text>enter your City: <TextInput
              ref="SecondInput"
                        style={{
                          height: 60,
                          width: windowSize.width / 6,
                          marginLeft: 10,
                          fontSize: textFont,
                          justifyContent: "center",
                          color: "black",
                        }}
                        returnKeyType="done"
                        placeholder="City"
                        value={this.state.City}
                        onSubmitEditing={(event) => {
                          Keyboard.dismiss;
                        }}
                        onChange={this.handleChange.bind(this, "City")}
              />
              
              </Text>
             
            </Card.Content>
            <Card.Content styles={[styles.chooseLevel,{justifyContent:'center',textAlign:'center'}]}><Text styles={[styles.chooseLevelText,{justifyContent:'center',textAlign:'center'}]}>choose level</Text></Card.Content>
            <Card.Content>
            
            <Card.Content style={styles.row1}>
              <Card.Content style={styles.row1_column1}>
                <TouchableOpacity
                  style={[styles.blue_column,styles.shadowProp]}
                  onPress={this.select.bind(this, "Beginner")}
                >
                  <Card.Content
                    style={{
                      
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: FONT,justifyContent:"center",textAlign:'center' }}
                    >
                      Beginner
                    </Text>
                  </Card.Content>
                  <Card.Content
                    style={{
                      
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.Level == "Beginner" ? (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/check.png")}
                      />
                    ) : (
                      <Card.Content></Card.Content>
                    )}
                  </Card.Content>
                </TouchableOpacity>
              </Card.Content>

              <Card.Content style={styles.row1_column2}>
                <TouchableOpacity
                  style={[styles.green_column,styles.shadowProp]}
                  onPress={this.select.bind(this, "Intermediate")}
                >
                  <Card.Content
                    style={{
                      
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: FONT ,justifyContent:"center",textAlign:'center'}}
                    >
                      Intermediate
                    </Text>
                  </Card.Content>
                  <Card.Content
                    style={{
                     
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.Level == "Intermediate" ? (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/check.png")}
                      />
                    ) : (
                      <Card.Content></Card.Content>
                    )}
                  </Card.Content>
                </TouchableOpacity>
              </Card.Content>
            </Card.Content>
            <Card.Content style={styles.row2}>
              <Card.Content style={styles.row2_column1}>
                <TouchableOpacity
                  style={[styles.blue_column,styles.shadowProp]}
                  onPress={this.select.bind(this, "Advanced")}
                >
                  <Card.Content
                    style={{
                      
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: FONT ,justifyContent:"center",textAlign:'center'}}
                    >
                      Advanced
                    </Text>
                  </Card.Content>
                  <Card.Content
                    style={{
                     
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.Level == "Advanced" ? (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/check.png")}
                      />
                    ) : (
                      <Card.Content></Card.Content>
                    )}
                  </Card.Content>
                </TouchableOpacity>
              </Card.Content>
              <Card.Content style={styles.row2_column2}>
                <TouchableOpacity
                  style={[styles.green_column,styles.shadowProp]}
                  onPress={this.select.bind(this, "Pro")}
                >
                  <Card.Content
                    style={{
                      
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: FONT,justifyContent:"center",textAlign:'center' }}
                    >
                      Pro
                    </Text>
                  </Card.Content>
                  <Card.Content
                    style={{
                     
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.Level == "Pro" ? (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/check.png")}
                      />
                    ) : (
                      <Card.Content></Card.Content>
                    )}
                  </Card.Content>
                </TouchableOpacity>
              </Card.Content>
            </Card.Content>
         
            </Card.Content>
            <Card.Content>
            
            
              <Card.Content
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign:'center',
                }}
              >
                <TouchableOpacity
                  onPress={this.play.bind(this)}
                  style={[styles.shadowProp,{
                    marginRight:'15%',
                    marginLeft:'5%',
                    height:height,
                    backgroundColor: "#27ae61",
                    width:"15%",
                    borderRadius:15,
                    textAlign:'center',
                    justifyContent:'center',
                  }]}
                >
                  
                    <Text
                      allowFontScaling={false}
                      style={{
                       justifyContent:'center',
                       textAlign:'center',
                        color: "white",
                        fontWeight: "bold",
                        fontSize: FONT,
                      }}
                    >
                      Play Now
                    </Text>
                 
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.home.bind(this)}
                  style={[styles.shadowProp,{
                    width:"15%",
                    height: height,
                    backgroundColor: "#34475d",
                    borderRadius:15,
                    marginRight:'5%',
                    marginleft:'15%',
                    justifyContent:'center',
                    textAlign:'center'
                  }]}
                >
                  
                    <Text
                      allowFontScaling={false}
                      style={{
                        justifyContent:'center',
                        textAlign:'center',
                        color: "white",
                        fontWeight: "bold",
                        fontSize: FONT,
                      }}
                    >
                      Home
                    </Text>
                 
                </TouchableOpacity>
              </Card.Content>
            </Card.Content>
           
           
          </Card>
        )}
        
      
      </Card>
    );
  }
} 