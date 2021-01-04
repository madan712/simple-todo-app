import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Switch, Alert } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SwipeableItem from 'react-native-swipeable-item';

import * as taskAction from '../../action/task-action';

import { styles } from '../../app-css';
	
class Task extends Component {
	
	constructor(props) {
		super(props);
		this.toggleActive = this.toggleActive.bind(this);
	}

	toggleActive() {
		//Update cache to avoid lag
		this.props.taskAction.updateTaskList(this.props.appReducer.taskList.map(t => (t.taskId === this.props.task.taskId ? {...t, isActive: t.isActive === 1 ? 0 : 1} : t)));
		//Update DB
		this.props.toggleActive(this.props.task.taskId)
	}
	
	deleteTask(taskId) {
		Alert.alert('Confirm','Do you want to delete this task?',[
			{ text: "YES", onPress: () => this.props.taskAction.deleteTask(taskId)},
			{ text: "NO", onPress: () => () => void 0 }
		],{ cancelable: true});
	}
	
	renderUnderlayLeft = ({ item, percentOpen }) => (
			<TouchableOpacity onPressOut={() => this.deleteTask(this.props.task.taskId)}>
				<View style={[styles.itemBg, {justifyContent: "flex-end"}]}>
					<Icon name="delete"/>
					<Text style={styles.title}></Text>
				</View>
			</TouchableOpacity>
	);

	renderUnderlayRight = ({ item, percentOpen, close }) => (
			<TouchableOpacity onPressOut={() => this.props.navigation.navigate('TaskForm', {'type': 'EDIT', 'task': this.props.task, 'cat': this.props.cat })}>
				<View style={[styles.itemBg, {justifyContent: "flex-start"}]}>
					<Icon name="edit"/>
					<Text style={styles.title}></Text>
				</View>
			</TouchableOpacity>
	);

	renderOverlay = ({ item, openLeft, openRight, openDirection, close }) => {
		return (
			<TouchableOpacity activeOpacity={1} onLongPress={this.props.drag}>
				<View style={[styles.item, {backgroundColor: this.props.task.color, borderWidth: this.props.isActive ? 2 : 0,}]} >
				<Text style={[styles.title, {textDecorationLine: this.props.task.isActive === 1 ? 'none' : 'line-through'}]}>{this.props.task.taskName}</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={this.props.task.isActive === 1 ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={this.toggleActive}
					value={this.props.task.isActive === 1}
				/>
				</View>
			</TouchableOpacity>
		);
	};
	
	render() {
		return (
			<SwipeableItem
				key={this.props.task.taskId}
				item={this.props.task, this.props.drag}
				ref={ref => void 0}
				overSwipe={50}
				renderUnderlayLeft={this.renderUnderlayLeft}
				snapPointsLeft={[50]}
				renderUnderlayRight={this.renderUnderlayRight}
				snapPointsRight={[50]}
				renderOverlay={this.renderOverlay}
			/>
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

export default connect( mapStateToProps, mapDispatchToProps )( Task );