import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ActionButton } from 'react-native-material-ui';
import {Header, Icon } from 'react-native-elements';

import { initApp, fetchTask } from './db'

import { styles } from "./app-css"

import {Item} from './item'


class App extends Component {
	
	constructor(props) {
        super(props);
		this.state = {'todoList': []};
    }
	
	async componentDidMount() {
		console.log('componentDidMount');
		initApp(() => {
			fetchTask((taskList) => {
				console.log(taskList);
				this.setState({'todoList': taskList})
			});
		});
		
	}
	
  render() {

    return (
            <View style={styles.container}>
			  <Header
				  centerComponent={{ text: 'TODO List', style: { color: '#fff' } }}
				/>
				<FlatList
					data={this.state.todoList}
					renderItem={({ item }) => <Item title={item.name}/>}
					keyExtractor={item => item.id.toString()}
				  />
				  <ActionButton onPress={() => { console.log("Add")}}/>
			</View>
    );
  }
}

export default App;


