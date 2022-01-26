import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SwipeableItem from 'react-native-swipeable-item'

import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'

import * as categoryAction from '../../action/category-action'

const Category = props => {

	const navigation = useNavigation()

	const deleteCategory = () => {
		if (props.cat.totalCount > 0) {
			Alert.alert('Confirm', 'Do you want to delete this category?', [
				{ text: "YES", onPress: () => props.categoryAction.deleteCategory(props.cat.catId) },
				{ text: "NO", onPress: () => void 0 }
			], { cancelable: true })
		} else {
			props.categoryAction.deleteCategory(props.cat.catId)
		}
	}

	const renderUnderlayRight = () => {
		return (
			<TouchableOpacity onPressOut={() => props.editCategory(props.cat)}>
				<View style={{ marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, flexDirection: 'row', backgroundColor: "#d3d3d3", justifyContent: "flex-start", alignItems: 'center' }}>
					<Icon style={{ paddingLeft: 10 }} name="edit" size={30} color='#808080' />
				</View>
			</TouchableOpacity>
		)
	}

	const renderUnderlayLeft = () => {
		return (
			<TouchableOpacity onPressOut={() => deleteCategory()}>
				<View style={{ marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, flexDirection: 'row', backgroundColor: "#d3d3d3", justifyContent: "flex-end", alignItems: 'center' }}>
					<Icon style={{ paddingRight: 10 }} name="trash" size={30} color='#808080' />
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
				<View style={{ marginTop: 10, marginHorizontal: 10, height: 50, borderRadius: 5, backgroundColor: props.cat.color, justifyContent: 'center', borderWidth: 1, borderColor: props.isActive ? '#000' : '#808080' }}>
					<Text style={{ paddingLeft: 10, fontSize: 20 }}>{props.cat.catName + " (" + props.cat.remainingCount + "/" + props.cat.totalCount + ")"}</Text>
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