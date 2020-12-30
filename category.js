import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteCategory } from './db'

import { styles } from "./app-css"

export const Category = ({ cat }) => (
  <View style={styles.item}>
	<View style={styles.text}>
		<Text style={styles.title}>{cat.catname}</Text>
	</View>
	<View style={styles.icons}>
		<TouchableOpacity onPress={() => console.log('edit')}>
			<Icon name='edit'/>
		</TouchableOpacity>
	</View>
	<View style={styles.icons}>
		<TouchableOpacity onPress={() => deleteCategory(cat.catid)}>
			<Icon name='delete'/>
		</TouchableOpacity>
	</View>
  </View>
);