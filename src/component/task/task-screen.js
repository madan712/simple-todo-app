import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as taskAction from '../../action/task-action';

import { styles } from "../../app-css"

import { Task } from './task'

class TaskScreen extends Component {
	
	getTaskList() {
		console.log('----------------TaskScreen getTaskList');
		return _.filter(this.props.appReducer.taskList, t => t.catId === this.props.navigation.state.params.cat.catId && t.taskId );
	}
	
  render() {
	console.log('Rendering task screen');
    return (
		<View style={styles.container}>
			<Toolbar
				style={{container: {backgroundColor: this.props.navigation.state.params.cat.color} }}
				leftElement='arrow-back' onLeftElementPress={() => this.props.navigation.goBack()}
				centerElement={this.props.navigation.state.params.cat.catName}
				rightElement={{ menu: {icon: "more-vert", labels: ['Delete all']} }}
				onRightElementPress={(option) => { 
					if(option.index === 0) {
						if(this.getTaskList().length === 0) {
							Alert.alert('Error','No task found',[],{ cancelable: true});
						} else {
							console.log('Delete all task');
							Alert.alert('Confirm','Do you want to delete all task?',[
								{ text: "YES", onPress: () => this.props.taskAction.deleteAllTask(this.props.navigation.state.params.cat.catId)},
								{ text: "NO", onPress: () => console.log("No Pressed") }
							],{ cancelable: true});
						}
					}
				}}
			/>
			<FlatList
				data={this.getTaskList()}
				renderItem={({ item }) => <Task task={item}/>}
				keyExtractor={item => item.taskId.toString()}
				ListEmptyComponent={<Text style={styles.empty}>No task found</Text>}
			/>
			<ActionButton onPress={ () => this.props.navigation.navigate('TaskForm', {'type': 'ADD', 'cat': this.props.navigation.state.params.cat }) }/>
		</View>
    );
  }
}

function mapStateToProps( state ) {
    return {
        appReducer: state.appReducer
    };
}

function mapDispatchToProps( dispatch ) {
    return {
		taskAction: bindActionCreators( taskAction, dispatch )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( TaskScreen );

