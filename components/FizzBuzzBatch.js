import React, {Component} from 'react';
import {View, Text, TextInput, ToastAndroid, StyleSheet} from 'react-native';
import FilteredList from './FilteredList';

export default class FizzBuzzBatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            batch: [],
            from: 0,
            to: 0,
        };

        this.cache = new Map();
        this.cacheAge = [];
    }

    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.text}>
                    Or... maybe you prefer to perform the query for a range of numbers (and without touching any buttons).
                </Text>

                <TextInput
                    style={styles.textInput}
                    placeholder={'E.g. 3 400'}
                    placeholderTextColor={'gray'}
                    onChangeText={(value) => {
                        this.setState({rangeString: value});
                    }}
                    onSubmitEditing = {() => {
                        
                    }}
                >
                </TextInput>
                
                <FilteredList
                    height = {100}
                    placeholder = {'Filter by => Fizz || Buzz || FizzBuzz'}
                    filterFunction ={this.filterFizzBuzz}
                    data = {this.state.batch}
                    renderItem={ ({item}) => <Text>{item.number + '     ' + item.fizzbuzz}</Text>}
                    keyExtractor = {(item) => item.number.toString()}
                >
                </FilteredList>
            </View>
        );
    }


const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        padding: 10
    },
    text: {
        fontSize: 15
    },
    textInput: {
        paddingHorizontal: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 200, 
        borderRadius:5, 
        borderWidth: 1
    },
  });