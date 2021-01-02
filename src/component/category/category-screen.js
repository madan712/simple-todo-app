import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as taskAction from '../../action/task-action';

import { styles } from "../../app-css"

import Category from './category'

class CategoryScreen extends Component {
	
	async componentDidMount() {
		console.log('CategoryScreen componentDidMount');
		this.props.taskAction.loadTaskList();
	}
	
	getCategoriesFromTaskList() {
		const categories = [];
		_.forEach(_.groupBy( this.props.appReducer.taskList, 'catId' ), (catArray, catId) => {
			const cat = catArray[0];
			cat['count'] = _.filter(catArray, c => c.taskId).length;
			categories.push(cat);
		});
		return categories;
	}
	
  render() {
	console.log('Rendering category screen');
    return (
		<View style={styles.container}>
			<Toolbar
				centerElement='Category List'
			/>
			<FlatList
				data={this.getCategoriesFromTaskList()}
				renderItem={({ item }) => <Category cat={item} navigation={this.props.navigation} />}
				keyExtractor={item => item.catId.toString()}
				ListEmptyComponent={<Text style={styles.empty}>No category found</Text>}
			/>
			
			<ActionButton onPress={() => this.props.navigation.navigate('CategoryForm', {'type': 'ADD'})}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( CategoryScreen );

