import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { initApp, fetchTask } from './db'

import { styles } from "./app-css"

import {Task} from './task'

class TaskScreen extends Component {
	
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
	console.log('Rendering task screen');
    return (
		<View style={styles.container}>
			<Toolbar
				centerElement="TODO List"
				rightElement={{ menu: {icon: "more-vert", labels: ["Category", "Delete all"]} }}
				onRightElementPress={(option) => { 
					if(option.index === 0) {
						this.props.navigation.navigate('CategoryScreen');
					} else if(option.index === 1) {
						console.log('Delete all task');
					}
				}}
			/>
			<FlatList
				data={this.state.todoList}
				renderItem={({ item }) => <Task task={item}/>}
				keyExtractor={item => item.id.toString()}
				ListEmptyComponent={<Text style={styles.empty}>No task found1</Text>}
			/>
			<ActionButton onPress={() => { console.log("Add task")}}/>
		</View>
    );
  }
}

export default TaskScreen;


