import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
	
	render() {
		return (
			<TouchableOpacity onLongPress={this.props.drag}>
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