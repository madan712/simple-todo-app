import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteCategory } from '../../db'

import { styles } from "../../app-css"

class Category extends Component {
	
  render() {
    return (
		<TouchableOpacity onLongPress={this.props.drag} onPress={() => this.props.navigation.navigate('TaskScreen', { 'cat': this.props.cat })}>
			<View style={[styles.item, {backgroundColor: this.props.cat.color, borderWidth: this.props.isActive ? 2 : 0,}]}>
				<Text style={styles.title}>{this.props.cat.catName+" ("+this.props.cat.count+")"}</Text>
		  </View>			
		</TouchableOpacity>
    );
  }
}

export default Category;

