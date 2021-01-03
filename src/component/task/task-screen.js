import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import DraggableFlatList from 'react-native-draggable-flatlist';

import * as taskAction from '../../action/task-action';

import { styles } from '../../app-css';

import Task from './task';

class TaskScreen extends Component {
	
	getTaskList() {
		return _.orderBy(_.filter(this.props.appReducer.taskList, t => t.catId === this.props.navigation.state.params.cat.catId && t.taskId ), 'tSeq');
	}
	
	updateSequence(taskList) {
		let sequence = new Map();
		_.forEach(taskList, (task, index) => {	
			sequence.set(task['taskId'], index + 1);
		});
		//Update cache to avoid lag
		this.props.taskAction.updateTaskList(this.props.appReducer.taskList.map(t => ({ ...t, tSeq: sequence.get(t.taskId)})));
		//Update DB
		this.props.taskAction.updateSequence(sequence);
	}
	
  render() {
    return (
		<View style={styles.container}>
			<Toolbar
				leftElement='arrow-back' onLeftElementPress={() => this.props.navigation.goBack()}
				centerElement={this.props.navigation.state.params.cat.catName}
				rightElement={{ menu: {icon: "more-vert", labels: ['Delete all']} }}
				onRightElementPress={(option) => { 
					if(option.index === 0) {
						if(this.getTaskList().length === 0) {
							Alert.alert('Error','No task found',[],{ cancelable: true});
						} else {
							Alert.alert('Confirm','Do you want to delete all task?',[
								{ text: "YES", onPress: () => this.props.taskAction.deleteAllTask(this.props.navigation.state.params.cat.catId)},
								{ text: "NO", onPress: () => console.log("No Pressed") }
							],{ cancelable: true});
						}
					}
				}}
			/>
			
			<DraggableFlatList
				data={this.getTaskList()}
				renderItem={({ item, index, drag, isActive }) => <Task drag={drag} isActive={isActive} task={item} toggleActive={this.props.taskAction.toggleActive} />}
				keyExtractor={item => item.taskId.toString()}
				onDragEnd={({ data }) => this.updateSequence(data)}
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

