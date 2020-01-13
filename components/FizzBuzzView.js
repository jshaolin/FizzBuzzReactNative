import React from 'react';
import {View, StyleSheet} from 'react-native';
import FizzBuzzSingle from './FizzBuzzSingle';
import FizzBuzzBatch from './FizzBuzzBatch';

const FizzBuzzView = () => (
    <View style={styles.mainView}>
        <FizzBuzzSingle></FizzBuzzSingle>
        <FizzBuzzBatch></FizzBuzzBatch>
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
