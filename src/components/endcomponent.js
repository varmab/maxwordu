import React, { Component } from 'react';
import {View,Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper'
import styles from '../Styles/endGameStyles'

const Endcomponent=({scores,level,rank,time}) => {
    
        return (
            <Card.Content
            style={{ flexDirection: "row", flexWrap: "wrap", }}
          >
            <View style={{ width: "50%", }}>
              <Text style={{ fontSize: 30,justifyContent:'center',alignSelf:'center' }}>
                {scores}
              </Text>
              <Text allowFontScaling={false} style={[styles.Score,{justifyContent:'center',alignSelf:'center'}]}>
                Score
              </Text>
            </View>


            <View
              style={{ width: "50%", }}
            >

              <View allowFontScaling={false} style={styles.Score}>
                <Text style={{fontSize:30}}>{rank}</Text>
                </View>
              {rank == null ? (
                <Text allowFontScaling={false} style={styles.Score}>
                  Rank
                </Text>
              ) : (
                <Text allowFontScaling={false} style={styles.Score}>
                  Rank
                </Text>
              )}
            </View>
            <View
              style={{ width: "50%", }}
            >
              <Text allowFontScaling={false} style={[styles.Score]}>
                Level: {level}
              </Text>
            </View>

            
            <View
              style={{ width: "50%", }}
            >
            <Text allowFontScaling={false} style={[styles.Score]}>
                Time: {time}
              </Text>
            </View>
          </Card.Content>
        );
}


export default Endcomponent;
