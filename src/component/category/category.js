import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SwipeableItem from 'react-native-swipeable-item'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import * as categoryAction from '../../action/category-action'
import { styles } from '../../app-css'

const Category = props => {

	const navigation = useNavigation()

	const deleteCategory = () => {
		if (props.cat.totalCount > 0) {
			Alert.alert('Confirm', 'Do you want to delete this category?', [
				{ text: 'YES', onPress: () => props.categoryAction.deleteCategory(props.cat.catId) },
				{ text: 'NO', onPress: () => void 0 }
			], { cancelable: true })
		} else {
			props.categoryAction.deleteCategory(props.cat.catId)
		}
	}

	const renderUnderlayRight = () => {
		return (
			<TouchableOpacity onPressOut={() => props.editCategory(props.cat)}>
				<View style={styles.underlayright}>
					<Icon style={styles.paddingleft10} name='edit' size={30} color='#808080' />
				</View>
			</TouchableOpacity>
		)
	}

	const renderUnderlayLeft = () => {
		return (
			<TouchableOpacity onPressOut={() => deleteCategory()}>
				<View style={styles.underlayleft}>
					<Icon style={styles.paddingright10} name='trash' size={30} color='#808080' />
				</View>
			</TouchableOpacity>
		)
	}

	return (
		<SwipeableItem
			key={props.cat.catId}
			item={props.cat}
			ref={(ref) => {
				if (ref && !props.itemRefs.current.get(props.cat.catId)) {
					props.itemRefs.current.set(props.cat.catId, ref);
				}
			}}
			overSwipe={50}
			renderUnderlayLeft={renderUnderlayLeft}
			snapPointsLeft={[50]}
			renderUnderlayRight={renderUnderlayRight}
			snapPointsRight={[50]}
			onChange={({ open }) => {
				if (open) {
					for (const [catId, ref] of props.itemRefs.current.entries()) {
						if (catId !== props.cat.catId && ref) ref.close();
					}
				}
			}}
		>
			<TouchableOpacity activeOpacity={0.6} onLongPress={props.drag} onPress={() => navigation.navigate('Task', { 'cat': props.cat })}>
				<View style={[styles.list, (props.isActive ? { borderColor: '#000' } : { borderColor: '#808080' }), { backgroundColor: props.cat.color, justifyContent: 'center' }]}>
					<Text style={styles.catfont}>{props.cat.catName + ' (' + props.cat.remainingCount + '/' + props.cat.totalCount + ')'}</Text>
				</View>
			</TouchableOpacity>
		</SwipeableItem>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		categoryAction: bindActionCreators(categoryAction, dispatch)
	}
}

export default connect(null, mapDispatchToProps)(Category);