import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteTask } from '../../db'

import { styles } from "../../app-css"

export const Task = ({ task }) => (
  <View style={styles.item}>
	<View style={styles.text}>
		<Text style={styles.title}>{task.taskName}</Text>
	</View>
  </View>
);