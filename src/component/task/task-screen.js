import React from 'react'
import { Alert, StatusBar, View } from 'react-native'
import { Appbar, Button, FAB, Modal, Text, TextInput } from 'react-native-paper'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { useNavigation } from '@react-navigation/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import Task from './task'
import * as taskAction from '../../action/task-action'
import { styles } from '../../app-css'
import { useKeyboard } from '../../util/use-keyboard'

const TaskScreen = props => {

	const cat = props.route.params.cat

	const navigation = useNavigation()

	const [visible, setVisible] = React.useState(false)

	const [inputValue, setInputValue] = React.useState('')

	const [edit, setEdit] = React.useState(false)
	const [editTaskId, setEditTaskId] = React.useState(0)

	const itemRefs = React.useRef(new Map())

	const createTask = () => {
		const task = inputValue.trim()
		if (task) {
			if (edit) {
				//console.log('Editing task ' + editTaskId + ':' + task)
				props.taskAction.updateTask(editTaskId, task)
				for (const [taskId, ref] of itemRefs.current.entries()) {
					if (ref) ref.close();
				}
			} else {
				//console.log('Saving new task ' + task)
				props.taskAction.insetTask(task, cat.catId)
			}
			navigation.navigate('Task', { 'cat': cat })
		}
	}

	const editTask = (task) => {
		//console.log('Edit task ' + task.taskName + ' in category ' + task.catName)
		setVisible(true)
		setEdit(true)
		setInputValue(task.taskName)
		setEditTaskId(task.taskId)
	}

	const updateSequence = (taskList) => {
		//console.log('Updting task sequence')
		let sequence = new Map()
		_.forEach(taskList, (task, index) => {
			sequence.set(task['taskId'], index + 1)
		});
		//Update cache to avoid lag
		props.taskAction.updateTaskList(props.appReducer.taskList.map(t => ({ ...t, tSeq: sequence.get(t.taskId) })))
		//Update DB
		props.taskAction.updateSequence(sequence)
	}

	const getTaskList = () => {
		return _.orderBy(_.filter(props.appReducer.taskList, t => t.catId === cat.catId && t.taskId), 'tSeq')
	}

	const deleteAll = () => {
		if (getTaskList().length > 0) {
			Alert.alert('Confirm', 'Do you want to delete all task?', [
				{ text: 'YES', onPress: () => props.taskAction.deleteAllTask(cat.catId) },
				{ text: 'NO', onPress: () => void 0 }
			], { cancelable: true })
		}
	}

	return (
		<View style={styles.container}>

			<StatusBar backgroundColor={styles.const['backgroundColor']} />

			<Appbar.Header statusBarHeight={0} style={styles.appbar}>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={props.route.params.cat.catName} />
				<Appbar.Action icon='delete' onPress={() => deleteAll()} />
			</Appbar.Header>

			<DraggableFlatList
				activationDistance={15}
				data={getTaskList()}
				renderItem={({ item, index, drag, isActive }) => <ScaleDecorator><Task drag={drag} isActive={isActive} task={item} itemRefs={itemRefs} editTask={editTask} /></ScaleDecorator>}
				keyExtractor={item => item.taskId.toString()}
				onDragEnd={({ data }) => updateSequence(data)}
				ListEmptyComponent={<Text style={[styles.center, styles.emptytext]}>EMPTY</Text>}
			/>

			<Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
				<View style={styles.inputpannel}>
					<TextInput
						mode='outlined'
						label='Task'
						value={inputValue}
						onChangeText={text => setInputValue(text)}
						style={styles.textbox}
						autoFocus
					/>

					<Button mode='contained' onPress={() => { createTask(), setInputValue(''), setVisible(false) }} style={styles.button}>{edit ? 'Edit' : 'Add'}</Button>
				</View>
			</Modal>

			<FAB
				style={styles.fab}
				icon='plus'
				onPress={() => { setVisible(true), setEdit(false) }}
				visible={!useKeyboard()}
			/>
		</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen)

