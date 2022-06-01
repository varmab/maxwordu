import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Platform, TouchableOpacity, Image } from 'react-native';
import { useTheme, Appbar, IconButton, Text, Card, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
// import SyncStore from './SyncStore';

const Header = props => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: 'black' }}>
      <StatusBar barStyle={'light-content'} />
      {/* <SyncStore timer={0}/> */}
      <Appbar.Header
        style={
          !props.headerStyle
            ? {
              backgroundColor: '#37475e',
              height: 50,
            }
            : [
              {
                borderBottomWidth: props.border ? props.border : 0.1,
                borderColor: 'white',
              },
              props.headerStyle,
            ]
        }>
        <Card.Content
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card.Content
            style={{
              flex: props.left ? 0.5 : 0.3,
              paddingHorizontal: 0,
              flexDirection: 'row',
            }}>
            {props.showBack && (
              <TouchableOpacity
                onPress={() =>
                  props.onBackPress
                    ? props.onBackPress()
                    : props.navigation.goBack()
                }
                style={{
                  marginLeft: 10,
                  backgroundColor: 'transparent',
                  flexDirection:'row'
                }}>
                <FontAwesome name='angle-left' color={'white'} size={22} />
                <Text style={{color:'white', fontSize:16,
              marginTop:2, marginLeft:10}}>Back</Text>
              </TouchableOpacity>
            )}
            {props.left ? props.leftType && props.leftType === 'icon' ?
              props.left :
              (<Text style={{ fontSize: 17, color: 'white' }}>
                {props.left}
              </Text>
              ) : null}
          </Card.Content>
          <Card.Content
            style={{
              flex: props.left ? 0.5 : 1,
              paddingHorizontal: 0,
              justifyContent: 'center',
            }}>
            <Appbar.Content
              title={props.title ? props.title : ''}
              style={{
                alignItems: props.left ? 'flex-start' : 'center',
                justifyContent: 'center',
                width: '100%',
              }}
              titleStyle={
                props.titleStyle
                  ? [
                    {
                      alignSelf: 'center',
                      fontSize: 17,
                      fontWeight: '600',
                    },
                    props.titleStyle,
                  ]
                  : {
                    color: 'white',
                    fontSize: 17,
                    fontWeight: '600',
                  }
              }></Appbar.Content>
          </Card.Content>
          <Card.Content
            style={{
              flex: 0.3,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingHorizontal: 0,
            }}>
            {props.right ? props.right : null}
          </Card.Content>
        </Card.Content>
      </Appbar.Header>
    </SafeAreaView>
  );
};

export default Header;
