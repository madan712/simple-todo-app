import React from 'react';
import { Text, View } from 'react-native';
import {Icon } from 'react-native-elements';

import { styles } from "./app-css"

export const Item = ({ title }) => (
  <View style={styles.item}>
	<View style={styles.text}>
		<Text style={styles.title}>{title}</Text>
	</View>
	<View style={styles.icons}>
		<Icon name='edit' onPress={() => console.log('edit')} />
	</View>
	<View style={styles.icons}>
		<Icon name='delete' onPress={() => console.log('delete')} />
	</View>
  </View>
);