import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Header from './Header';
import styles from '../Styles/topScoresStyles'
import { Card, Text } from 'react-native-paper';
import moment from 'moment';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '@expo/vector-icons/FontAwesome'

const home_icon = (
  <Icon name="home" size={40} color="white"/>)

const restart_icon = (
  <Icon name="rotate-left" size={40} color="white"/>)

const help_icon = (
  <Icon name="question" size={40} color="white"/>)


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
      
       <Card.Content style={[styles.ListContainer,{borderWidth:1,borderRadius:20,height:60,marginVertical:5}]} >
        <View style={[styles.subContainer]}>
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
        
        
        
     
     <View style={styles.footer}>
        <View style={[styles.button]}>
        <View>
          <TouchableOpacity onPress={this.home.bind(this)}>
            <View style={styles.buttonParent}>
              <LinearGradient
                colors={['#848484', "#535353","#313131"]}
                style={styles.buttonGrad}
              >
                {home_icon}
                <Text style={styles.text_button}>HOME</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
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
      </View>
    </Card>
      );
  }
  

  
  
}

