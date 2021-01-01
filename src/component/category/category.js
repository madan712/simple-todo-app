import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-material-ui';

import { deleteCategory } from '../../db'

import { styles } from "../../app-css"

export const Category = ({ cat }) => (
  <View style={[styles.item, {backgroundColor: cat.color}]} onStartShouldSetResponder={() => console.log('View Clicked...')}>
		<Text style={styles.title}>{cat.catname}</Text>
  </View>
);