import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { ActionButton, Toolbar } from 'react-native-material-ui';

import { initApp, fetchCategoryList } from './db'

import { styles } from "./app-css"

import {Category} from './category'

class CategoryScreen extends Component {
	
	constructor(props) {
        super(props);
		this.state = {'catList': []};
    }
	
	async componentDidMount() {
		console.log('componentDidMount');
		initApp(() => {
			fetchCategoryList((catList) => {
				console.log(catList);
				this.setState({'catList': catList})
			});
		});
		
	}
	
  render() {
	console.log('Rendering category screen');
    return (
		<View style={styles.container}>
			<Toolbar
				leftElement='arrow-back'
				onLeftElementPress={this.props.navigation.goBack}
				centerElement='Category List'
			/>
			<FlatList
				data={this.state.catList}
				renderItem={({ item }) => <Category cat={item}/>}
				keyExtractor={item => item.catid.toString()}
				ListEmptyComponent={<Text style={styles.empty}>No category found</Text>}
			/>
			
			<ActionButton onPress={() => { console.log("Add category")}}/>
		</View>
    );
  }
}

export default CategoryScreen;


