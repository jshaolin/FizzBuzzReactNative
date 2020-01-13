import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class IntroView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            smiley: ':-)',
        };

        setInterval(() => {
            if (this.state.smiley === ':-)') {
                this.setState({smiley: ';-)'});
            }
            else {
                this.setState({smiley: ':-)'});
            }
            
        }, 1000);
    }

    render() {
        return (
            <View style = {styles.mainView}>
                <Text style={styles.welcome}>Welcome</Text>

                <Text style={styles.overEng}>This is an over-engineered solution of...</Text>

                <Text style={styles.infamous}>The infamous</Text>

                <Text style={styles.fizzbuzz}>FizzBuzz Test</Text>

                <Text style={styles.smiley}>{this.state.smiley}</Text>

                <Text style={styles.swipe}>Swipe right to begin!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "rgba(0, 0, 0, 0.1)", 
        flex: 1, 
        alignItems: 'center'
    },
    welcome: {
        fontSize: 40, 
        marginTop: 30
    },
    overEng: {
        fontSize: 20, 
        marginTop: 10, 
        padding: 10
    },
    infamous: {
        fontSize: 30
    },
    fizzbuzz: {
        fontSize: 50, 
        marginTop: 1
    },
    smiley: {
        fontSize: 50, 
        marginTop: 50
    },
    swipe: {
        fontSize: 20, 
        marginTop: 50, 
        color: 'green'
    }
});