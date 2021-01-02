import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteCategory } from '../../db'

import { styles } from "../../app-css"

class Category extends Component {
	
  render() {
    return (
		<View style={[styles.item, {backgroundColor: this.props.cat.color}]} onStartShouldSetResponder={() => this.props.navigation.navigate('TaskScreen', { 'cat': this.props.cat })}>
			<Text style={styles.title}>{this.props.cat.catName+" ("+this.props.cat.count+")"}</Text>
	  </View>
    );
  }
}

export default Category;

