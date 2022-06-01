import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyScores from '../components/MyScores'

const MyScoresScreen = (props) => {
  return (
    <MyScores {...props} />
  )
}

export default MyScoresScreen

const styles = StyleSheet.create({})