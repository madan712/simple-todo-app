import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { styles } from '../../app-css';
import SwipeableItem from 'react-native-swipeable-item';

import * as categoryAction from '../../action/category-action';

class Category extends Component {
	
	deleteCategory(catId) {
		Alert.alert('Confirm','Do you want to delete this category?',[
			{ text: "YES", onPress: () => this.props.categoryAction.deleteCategory(catId)},
			{ text: "NO", onPress: () => () => void 0 }
		],{ cancelable: true});
	}
	
	renderUnderlayLeft = ({ item, percentOpen }) => (
			<TouchableOpacity onPressOut={() => this.deleteCategory(this.props.cat.catId)}>
				<View style={[styles.itemBg, {justifyContent: "flex-end"}]}>
					<Icon name="delete"/>
					<Text style={styles.title}></Text>
				</View>
			</TouchableOpacity>
	);

	renderUnderlayRight = ({ item, percentOpen, close }) => (
			<TouchableOpacity onPressOut={() => this.props.navigation.navigate('CategoryForm', {'type': 'EDIT', 'cat': this.props.cat})}>
				<View style={[styles.itemBg, {justifyContent: "flex-start"}]}>
					<Icon name="edit"/>
					<Text style={styles.title}></Text>
				</View>
			</TouchableOpacity>
	);

	renderOverlay = ({ item, openLeft, openRight, openDirection, close }) => {
		return (
			<TouchableOpacity activeOpacity={1} onLongPress={this.props.drag} onPress={() => this.props.navigation.navigate('TaskScreen', { 'cat': this.props.cat })}>
				<View style={[styles.item, {backgroundColor: this.props.cat.color, borderWidth: this.props.isActive ? 2 : 0,}]}>
					<Text style={styles.title}>{this.props.cat.catName+" ("+this.props.cat.remainingCount+"/"+this.props.cat.totalCount+")"}</Text>
			  </View>			
			</TouchableOpacity>
		);
	};
	
	render() {
		return (
			<SwipeableItem
				key={this.props.cat.catId}
				item={this.props.cat, this.props.drag}
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

function mapDispatchToProps( dispatch ) {
    return {
		categoryAction: bindActionCreators( categoryAction, dispatch )
    };
}

export default connect( null, mapDispatchToProps )( Category );