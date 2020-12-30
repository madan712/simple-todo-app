import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteTask } from './db'

import { styles } from "./app-css"

export const Task = ({ task }) => (
  <View style={styles.item}>
	<View style={styles.text}>
		<Text style={styles.title}>{task.name}</Text>
		<Text style={styles.subtitle}>{task.catname}</Text>
	</View>
	<View style={styles.icons}>
		<TouchableOpacity onPress={() => console.log('edit')}>
			<Icon name='edit'/>
		</TouchableOpacity>
	</View>
	<View style={styles.icons}>
		<TouchableOpacity onPress={() => deleteTask(task.id)}>
			<Icon name='delete'/>
		</TouchableOpacity>
	</View>
  </View>
);