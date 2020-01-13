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
                        let fromTo = getValidRange(this.state.rangeString);
                        this.batchFizzBuzz(fromTo.from, fromTo.to);
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

    batchFizzBuzz(from, to) {
        if (isNaN(from) || isNaN(to)) {
            return null;
        }

        let inCache = this.cache.get({from: from, to: to});
        if (inCache != undefined) {
            return inCache;
        }

        let request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            
            if (request.status === 200) {
                console.log('Request done');
                ToastAndroid.showWithGravity('Fetching done', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    
                let result = JSON.parse(request.response);
                this.addToCache({from: from, to: to}, result);
                this.setState({batch: result});
            } 
            else {
                console.log('NETWORK ERROR');
                ToastAndroid.showWithGravity('Fetching failed', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        };
        request.open('GET', 'https://fizzbuzzbatch.glitch.me/batch/' + from + ' ' + to);
        request.send();
    
        
    }

    addToCache(range, batch) {
        if (this.isCacheFull()) {
            //Cache is full, drop the oldest entry.
            this.deleteOldestEntry();
        }
    
        //Cache has space, add it.
        this.cache.set(range, batch);
        this.cacheAge.push(range);
    }

    isCacheFull() {
        return this.cache.size === this.props.cacheLimit;
    }

    getOldestEntry() {
        return this.cacheAge.shift();
    }

    deleteOldestEntry() {
        let toDelete = this.getOldestEntry();
        return this.cache.delete(toDelete);
    }

    isIntegerRange(rangeString) {
        return rangeString.trim().match(/-?[0-9]+\s-?[0-9]+/) != null;
    }
    
    isOrderedRange(from, to) {
        if (from > to) {
            return false;
        }
    
        return true;
    }
    
    toIntEndpoints(from, to) {
        return [parseInt(from), parseInt(to)];
    }
    
    getEndpoints(rangeString) {
        return rangeString.split(' ');
    }
    
    getValidRange(rangeString) {
        if (this.isIntegerRange(rangeString)) {
            let fromTo = this.getEndpoints(rangeString);
            
            let [from, to] = this.toIntEndpoints(fromTo[0], fromTo[1]);
                    
            if (this.isOrderedRange(from, to)) {
                return {from: from, to: to}
            }
        }
    
        return {from: NaN, to: NaN}
    }

    filterFizzBuzz(queryString, data) {
        let filter = data;
    
        if (queryString.length > 0) {
            filter = filter.filter((item) => {
                return item.fizzbuzz === queryString;
            });
        }
    
        return filter;
    }
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