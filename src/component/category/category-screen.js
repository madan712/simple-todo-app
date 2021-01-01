import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import * as categoryAction from '../../action/category-action';

import { styles } from "../../app-css"

import {Category} from './category'


class CategoryScreen extends Component {
	
	async componentDidMount() {
		console.log('CategoryScreen componentDidMount');
		this.props.categoryAction.loadCategoryList();
	}
	
  render() {
	console.log('Rendering category screen');
    return (
		<View style={styles.container}>
			<Toolbar
				centerElement='Category List'
			/>
			<FlatList
				data={this.props.categoryReducer.categoryList}
				renderItem={({ item }) => <Category cat={item}/>}
				keyExtractor={item => item.catid.toString()}
				ListEmptyComponent={<Text style={styles.empty}>No category found</Text>}
			/>
			
			<ActionButton onPress={() => this.props.navigation.navigate('CategoryForm', {type: 'ADD'})}/>
		</View>
    );
  }
}

function mapStateToProps( state ) {
    return {
        categoryReducer: state.categoryReducer
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        categoryAction: bindActionCreators( categoryAction, dispatch )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CategoryScreen );

