import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Switch } from 'react-native-paper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SwipeableItem from 'react-native-swipeable-item'
import Icon from 'react-native-vector-icons/FontAwesome5'

import * as taskAction from '../../action/task-action'
import { styles } from '../../app-css'

const Task = props => {

	const renderUnderlayRight = () => {
		return (
			<TouchableOpacity onPressOut={() => props.editTask(props.task)}>
				<View style={styles.underlayright}>
					<Icon style={styles.paddingleft10} name='edit' size={30} color='#808080' />
				</View>
			</TouchableOpacity>
		)
	}

	const renderUnderlayLeft = () => {
		return (
			<TouchableOpacity onPressOut={() => props.taskAction.deleteTask(props.task.taskId)}>
				<View style={styles.underlayleft}>
					<Icon style={styles.paddingright10} name='trash' size={30} color='#808080' />
				</View>
			</TouchableOpacity>
		)
	}

	const toggleActive = () => {
		//Update cache to avoid lag
		props.taskAction.updateTaskList(props.appReducer.taskList.map(t => (t.taskId === props.task.taskId ? { ...t, isActive: t.isActive === 1 ? 0 : 1 } : t)))
		//Update DB
		props.taskAction.toggleActive(props.task.taskId)
	}

	return (
		<SwipeableItem
			key={props.task.taskId}
			item={props.task}
			ref={(ref) => {
				if (ref && !props.itemRefs.current.get(props.task.taskId)) {
					props.itemRefs.current.set(props.task.taskId, ref);
				}
			}}
			overSwipe={50}
			renderUnderlayLeft={renderUnderlayLeft}
			snapPointsLeft={[50]}
			renderUnderlayRight={renderUnderlayRight}
			snapPointsRight={[50]}
			onChange={({ open }) => {
				if (open) {
					for (const [taskId, ref] of props.itemRefs.current.entries()) {
						if (taskId !== props.task.taskId && ref) ref.close();
					}
				}
			}}
		>
			<TouchableOpacity activeOpacity={0.6} onLongPress={props.drag}>
				<View style={[styles.list, (props.isActive ? { 'borderColor': '#000' } : { 'borderColor': '#808080' }), { backgroundColor: props.task.color, justifyContent: 'space-between', flexDirection: 'row' }]}>
					<Text style={[styles.taskfont, (props.task.isActive === 1 ? { 'textDecorationLine': 'none' } : { 'textDecorationLine': 'line-through' })]}>{props.task.taskName}</Text>
					<Switch value={props.task.isActive === 1} onValueChange={toggleActive} />
				</View>
			</TouchableOpacity>
		</SwipeableItem>
	)
}

const mapStateToProps = (state) => {
	return {
		appReducer: state.appReducer
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		taskAction: bindActionCreators(taskAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)