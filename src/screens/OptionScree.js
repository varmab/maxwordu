//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Options from '../components/Options'

// create a component
const OptionsScreen = (props) => {
    return (
        <Options {...props} />
    );
};

export default OptionsScreen;
