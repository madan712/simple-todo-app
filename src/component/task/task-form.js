import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Button,Alert } from 'react-native';
import { Toolbar, Icon } from 'react-native-material-ui';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as taskAction from '../../action/task-action';

import { styles } from '../../app-css';

const { width } = Dimensions.get('window');

class TaskForm extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {'name':''};
		this.createTask = this.createTask.bind( this );
		
		this.isAdd = this.props.navigation.state.params.type === 'ADD';
    }
	
	componentDidMount() {
		if(!this.isAdd) {
			this.setState({ 'name': this.props.navigation.state.params.task.taskName });
		}
	}
	
	createTask() {
		if(this.state.name && this.state.name.trim()) {
			
			if(this.isAdd) {
				this.props.taskAction.insetTask(this.state.name.trim(), this.props.navigation.state.params.cat.catId);
			} else {
				this.props.taskAction.updateTask(this.props.navigation.state.params.task.taskId, this.state.name.trim());
			}
			
			this.props.navigation.navigate('TaskScreen', {'cat': this.props.navigation.state.params.cat });
		} else {
			Alert.alert('Error','Please enter task name',[],{ cancelable: true});
		}
	}
	
	getCenterElement(text) {
		return (
			<Text style={{paddingTop: 20, color:'#fff', fontSize: 20,}}>{text}</Text>
		);
	}
	
	render() {
		const header = this.isAdd ? 'Create new task' : 'Edit task';
		
		return (
			<View style={styles.formContainer}>
				<Toolbar
					style={{container:{height: 60}, leftElementContainer:{paddingTop: 20}}}
					leftElement='arrow-back'
					onLeftElementPress={() => this.props.navigation.goBack()}
					centerElement={this.getCenterElement(header)} />
				
				<View style={styles.inputView}>
					<Text style={{paddingBottom:10}}>Task name</Text>
					<TextInput
						style={styles.inputText}
						placeholder='Task name'
						maxLength={20}
						value={this.state.name}
						autoFocus
						onChangeText={(name) => this.setState({'name':name})}
					/>
				</View>
				<View style={styles.inputView} style={{alignItems:'center', paddingTop: 20}}>
					<Button
						title={this.isAdd ? 'Create' : 'Edit'}
						onPress={this.createTask}
					  />
				</View>
			</View>
		);
	}
}

function mapDispatchToProps( dispatch ) {
    return {
        taskAction: bindActionCreators( taskAction, dispatch )
    };
}

export default connect( null, mapDispatchToProps )( TaskForm );