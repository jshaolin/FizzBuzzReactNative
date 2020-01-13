import React, {Component} from 'react';
import {View, StyleSheet, TextInput, FlatList} from 'react-native';

export default class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterQuery: '',
    };
  }

  render() {
    return (
      <View>
        <View style={styles.search}>
          <TextInput style={styles.input}
            placeholder={this.props.placeholder}
            placeholderTextColor={'gray'}
            onChangeText = {(value) => this.setState({filterQuery: value})}
          />
        </View>
        
        <View style ={{alignItems: 'center', height: this.props.height}}>
          <FlatList style={styles.list}
            data={this.props.filterFunction(this.state.filterQuery, this.props.data)}
            renderItem={this.props.renderItem}
            keyExtractor={this.props.keyExtractor}
          />
        </View>
      </View>
    )
  }
}

FilteredList.defaultProps = {
  data: [],
  filterFunction: () => {},
  height: 300,
  placeholder: '',
  renderItem: () => {},
  keyExtractor: () => {}
}; 

const styles = StyleSheet.create({
  input: {
    height: 35,
    color: 'black',
    paddingHorizontal: 5,
    flex: 1
  },
  search: {
    borderColor: '#8e8786',
    flexDirection: 'row',
    width: 345,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 5,
  },
  list: {
    width: 300, 
    borderColor:'black', 
    borderRadius: 5, 
    borderWidth: 2,
    paddingHorizontal: 5
  }
});
