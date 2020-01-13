import React from 'react';
import {View, StyleSheet} from 'react-native';
import FizzBuzzSingle from './FizzBuzzSingle';

const FizzBuzzView = () => (
    <View style={styles.mainView}>
        <FizzBuzzSingle></FizzBuzzSingle>
    </View>
)

const styles = StyleSheet.create({
    mainView: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default FizzBuzzView;