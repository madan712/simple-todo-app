import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, TextInput, Button,Alert } from 'react-native';
import { Toolbar, Icon } from 'react-native-material-ui';
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as taskAction from '../../action/task-action';

import { styles } from "../../app-css";

const { width } = Dimensions.get('window');

class TaskForm extends React.Component {
	
	constructor(props) {
        super(props);
		this.state = {'name':''};
		this.createTask = this.createTask.bind( this );
    }
	
	createTask() {
		
		if(this.state.name) {
			console.log('----------------------');
			console.log(this.state.name);
			this.props.taskAction.insetTask(this.state.name, this.props.navigation.state.params.cat.catId);
			this.props.navigation.navigate('TaskScreen', {'cat': this.props.navigation.state.params.cat });
		} else {
			Alert.alert('Please enter task name');
		}
	}
	
	render() {
		const header = this.props.navigation.state.params.type === 'ADD' ? 'Create new task' : 'Edit task';
		
		return (
			<View style={styles.formContainer}>
				<Toolbar
					style={{container: {backgroundColor: this.props.navigation.state.params.cat.color} }}
					leftElement='arrow-back'
					onLeftElementPress={() => this.props.navigation.goBack()}
					centerElement={header} />
				
				<View style={styles.inputView}>
					<Text style={{paddingBottom:10}}>Task name</Text>
					<TextInput
						style={styles.inputText}
						placeholder="Task name"
						maxLength={20}
						onChangeText={(name) => this.setState({'name':name})}
					/>
				</View>
				<View style={styles.inputView} style={{alignItems:"center", paddingTop: 20}}>
					<Button
						title="Create"
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