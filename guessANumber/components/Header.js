import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import TitleText from './TitleText';

import colors from '../constants/colors';
const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>
    )
}


const styles = StyleSheet.create({
    header:{
        width: "100%",
        height: 90, 
        paddingTop: 36, 
        backgroundColor: Platform.OS ===  'android' ? colors.primary : 'white',
        alignItems: "center",
        justifyContent: "center",
        borderColor: Platform.OS === 'ios' ? "black" : 'transparent',
        borderWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    title: {
        color: Platform.OS === 'ios' ? colors.primary : 'white',
    }
});
export default Header;