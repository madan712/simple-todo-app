import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DraggableFlatList from 'react-native-draggable-flatlist';

import _ from 'lodash';

import * as taskAction from '../../action/task-action';
import * as categoryAction from '../../action/category-action';

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
		//console.log('-----------------getCategoriesFromTaskList');
		//console.log(categories);
		return _.orderBy(categories,'cSeq');
	}
	
	updateSequence(categories) {
		//console.log('-----------------updateSequence');
		//console.log(categories);
		const sequence = [];
		_.forEach(categories, (cat, index) => {	
			sequence.push({'catId':cat['catId'], 'index':index + 1});
		});
		//console.log(sequence);
		this.props.categoryAction.updateSequence(sequence);
	}
	
  render() {
	console.log('Rendering category screen');
    return (
		<View style={styles.container}>
			<Toolbar
				centerElement='Category List'
				rightElement={{ menu: {icon: "more-vert", labels: ['Delete all']} }}
				onRightElementPress={(option) => { 
					if(option.index === 0) {
						console.log('Delete all category');
						this.props.categoryAction.deleteAllCategory();
					}
				}}
			/>
			
			<DraggableFlatList
				data={this.getCategoriesFromTaskList()}
				renderItem={({ item, index, drag, isActive }) => <Category drag={drag} isActive={isActive} cat={item} navigation={this.props.navigation} />}
				keyExtractor={item => item.catId.toString()}
				onDragEnd={({ data }) => this.updateSequence(data)}
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
		taskAction: bindActionCreators( taskAction, dispatch ),
		categoryAction: bindActionCreators( categoryAction, dispatch )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CategoryScreen );

