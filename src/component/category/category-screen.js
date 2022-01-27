import React from 'react'
import { Alert, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, FAB, Modal, Text, TextInput } from 'react-native-paper'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import _ from 'lodash'

import Category from './category'
import { ColorSelector } from './color-selector'

import * as taskAction from '../../action/task-action'
import * as categoryAction from '../../action/category-action'

import { useKeyboard } from '../../util/use-keyboard'

const CategoryScreen = props => {

	const [visible, setVisible] = React.useState(false)

	const [inputValue, setInputValue] = React.useState('')

	const [edit, setEdit] = React.useState(false)
	const [editCatId, setEditCatId] = React.useState(0)

	const colors = ['#F79F81', '#F5D0A9', '#FACC2E', '#F3F781', '#D0F5A9', '#A9F5A9', '#A9F5D0', '#A9D0F5', '#F5A9F2', '#CECEF6', '#CEF6F5', '#BDBDBD']
	const defaultIndex = _.random(0, colors.length - 1)
	const [color, setColor] = React.useState(colors[defaultIndex])

	React.useEffect(() => {
		console.log('Loading category')
		props.taskAction.loadTaskListInitial()
	}, [])

	const itemRefs = React.useRef(new Map())

	const addCategory = () => {
		const category = inputValue.trim()
		if (category) {
			if (edit) {
				console.log('Editing category ' + editCatId + ':' + category)
				props.categoryAction.updateCategory(editCatId, category, color)
				for (const [catId, ref] of itemRefs.current.entries()) {
					if (ref) ref.close();
				}
			} else {
				console.log('Saving new category ' + category)
				props.categoryAction.insetCategory(category, color)
			}
		}
	}

	const editCategory = (cat) => {
		console.log('Edit category ' + cat.catName)
		setVisible(true)
		setEdit(true)
		setEditCatId(cat.catId)
		setInputValue(cat.catName)
		setColor(cat.color)
	}

	const getCategoriesFromTaskList = () => {
		const categories = []
		_.forEach(_.groupBy(props.appReducer.taskList, 'catId'), (catArray, catId) => {
			const cat = catArray[0]
			cat['totalCount'] = _.filter(catArray, c => c.taskId).length
			cat['remainingCount'] = _.filter(catArray, c => c.isActive === 0).length
			categories.push(cat)
		})
		return _.orderBy(categories, 'cSeq')
	}

	const updateSequence = (categories) => {
		console.log('Updting category sequence')
		let sequence = new Map()
		_.forEach(categories, (cat, index) => {
			sequence.set(cat['catId'], index + 1)
		})
		//Update cache to avoid lag
		props.taskAction.updateTaskList(props.appReducer.taskList.map(t => ({ ...t, cSeq: sequence.get(t.catId) })))
		//Update DB
		props.categoryAction.updateSequence(sequence)
	}

	const deleteAll = () => {

		Alert.alert('Confirm', 'Do you want to delete all categories?', [
			{ text: "YES", onPress: () => props.categoryAction.deleteAllCategory() },
			{ text: "NO", onPress: () => void 0 }
		], { cancelable: true })
	}

	return (

		<View style={{ flex: 1, paddingBottom: 90 }}>
			<Appbar.Header style={{ backgroundColor: '#3b5998' }}>
				<Appbar.Content title="TODO" />
				<Appbar.Action icon="delete" onPress={() => deleteAll()} />
			</Appbar.Header>
			{
				props.appReducer.isLoaded ?
					<DraggableFlatList
						activationDistance={15}
						data={getCategoriesFromTaskList()}
						renderItem={({ item, index, drag, isActive }) => <ScaleDecorator><Category drag={drag} isActive={isActive} cat={item} itemRefs={itemRefs} editCategory={editCategory} /></ScaleDecorator>}
						keyExtractor={item => item.catId.toString()}
						onDragEnd={({ data }) => updateSequence(data)}
						ListEmptyComponent={<Text style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', marginTop: 50 }}>EMPTY</Text>}
					/>
					:
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator animating={true} color='#3b5998' />
					</View>
			}
			<Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{ marginHorizontal: 10, backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
					<TextInput
						mode='outlined'
						label='Category'
						value={inputValue}
						onChangeText={text => setInputValue(text)}
						style={{ width: 200, height: 40 }}
						autoFocus
					/>
					<Button mode="contained" onPress={() => { addCategory(), setInputValue(''), setVisible(false) }} style={{ marginTop: 5, height: 40, justifyContent: 'center', backgroundColor: '#3b5998' }}>{edit ? 'Edit' : 'Add'}</Button>
				</View>
				<ColorSelector colors={colors} setColor={setColor} color={color} />
			</Modal>

			<FAB
				style={{ position: 'absolute', margin: 25, bottom: 0, alignSelf: 'center', backgroundColor: '#3b5998' }}
				icon="plus"
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
		taskAction: bindActionCreators(taskAction, dispatch),
		categoryAction: bindActionCreators(categoryAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)