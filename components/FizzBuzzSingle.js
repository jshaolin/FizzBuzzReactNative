import React, {Component} from 'react';
import {View, Text, TextInput, Button, Alert, Vibration, StyleSheet, ToastAndroid} from 'react-native';

export default class FizzBuzzSingle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: NaN
        };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.write}>Write a number, the app will use a REST endpoint to query 
                    its fizzbuzzbility.
                </Text>
                <TextInput style={styles.search}
                    placeholder={'Type in a number'}
                    placeholderTextColor={'gray'}
                    keyboardType={'numeric'}
                    onChangeText = {(value) => this.setState({number: value})}
                >
                </TextInput>
                <Button title={'FizzBuzz?'}
                    onPress = {() => {
                        this.isFizzBuzz(this.state.number);
                    }}
                >
                </Button>
            </View>
        );
    }

    isFizzBuzz(number) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }
            
            if (request.status === 200) {
                console.log('Request done');
                let result = request.response;
                ToastAndroid.showWithGravity('Fetching done', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    
                Alert.alert("Result", result);
                if (result === 'Fizz' || result === 'Buzz') {
                    Vibration.vibrate(500);
                }
                else if (result === 'FizzBuzz') {
                    Vibration.vibrate([0, 500, 100, 500]);
                }
            } 
            else {
                console.log('NETWORK ERROR');
                ToastAndroid.showWithGravity('Fetching failed', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            }
        };
        request.open('GET', 'https://isfizzbuzz.glitch.me/test/' + number);
        request.send();
    }
}

const styles = StyleSheet.create({
    search: {
        borderColor: '#8e8786',
        flexDirection: 'row',
        width: 345,
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    input: {
        height: 35,
        color: 'black',
        paddingHorizontal: 5,
        flex: 1
      },
      mainView: {
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 10
      },
      write: {
          fontSize: 15
      }
});
