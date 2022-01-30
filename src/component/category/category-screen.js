import React from 'react'
import { Alert, StatusBar, View } from 'react-native'
import { ActivityIndicator, Appbar, Button, FAB, Modal, Text, TextInput } from 'react-native-paper'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import Category from './category'
import { ColorSelector } from './color-selector'
import * as taskAction from '../../action/task-action'
import * as categoryAction from '../../action/category-action'
import { styles } from '../../app-css'
import { useKeyboard } from '../../util/use-keyboard'

const CategoryScreen = props => {

	const [visible, setVisible] = React.useState(false)

	const [inputValue, setInputValue] = React.useState('')

	const [edit, setEdit] = React.useState(false)
	const [editCatId, setEditCatId] = React.useState(0)

	const colors = ['#F6CECE', '#F5D0A9', '#F5ECCE', '#D4E6F1', '#D0F5A9', '#A9F5A9', '#A9F5D0', '#A9D0F5', '#F6CEF5', '#CECEF6', '#CEF6F5', '#BDBDBD']
	const defaultIndex = _.random(0, colors.length - 1)
	const [color, setColor] = React.useState(colors[defaultIndex])

	React.useEffect(() => {
		//console.log('Loading category')
		props.taskAction.loadTaskListInitial()
	}, [])

	const itemRefs = React.useRef(new Map())

	const addCategory = () => {
		const category = inputValue.trim()
		if (category) {
			if (edit) {
				//console.log('Editing category ' + editCatId + ':' + category)
				props.categoryAction.updateCategory(editCatId, category, color)
				for (const [catId, ref] of itemRefs.current.entries()) {
					if (ref) ref.close();
				}
			} else {
				//console.log('Saving new category ' + category)
				props.categoryAction.insetCategory(category, color)
			}
		}
	}

	const editCategory = (cat) => {
		//console.log('Edit category ' + cat.catName)
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
		//console.log('Updting category sequence')
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
			{ text: 'YES', onPress: () => props.categoryAction.deleteAllCategory() },
			{ text: 'NO', onPress: () => void 0 }
		], { cancelable: true })
	}

	return (

		<View style={styles.container}>

			<StatusBar backgroundColor={styles.const['backgroundColor']} />

			<Appbar.Header statusBarHeight={0} style={styles.appbar}>
				<Appbar.Content title='TODO' />
				<Appbar.Action icon='delete' onPress={() => deleteAll()} />
			</Appbar.Header>
			{
				props.appReducer.isLoaded ?
					<DraggableFlatList
						activationDistance={15}
						data={getCategoriesFromTaskList()}
						renderItem={({ item, index, drag, isActive }) => <ScaleDecorator><Category drag={drag} isActive={isActive} cat={item} itemRefs={itemRefs} editCategory={editCategory} /></ScaleDecorator>}
						keyExtractor={item => item.catId.toString()}
						onDragEnd={({ data }) => updateSequence(data)}
						ListEmptyComponent={<Text style={[styles.center, styles.emptytext]}>EMPTY</Text>}
					/>
					:
					<View style={styles.center}>
						<ActivityIndicator animating={true} color={styles.const['backgroundColor']} />
					</View>
			}
			<Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modal}>
				<View style={styles.inputpannel}>
					<TextInput
						mode='outlined'
						label='Category'
						value={inputValue}
						onChangeText={text => setInputValue(text)}
						style={styles.textbox}
						autoFocus
					/>
					<Button mode='contained' onPress={() => { addCategory(), setInputValue(''), setVisible(false) }} style={styles.button}>{edit ? 'Edit' : 'Add'}</Button>
				</View>
				<ColorSelector colors={colors} setColor={setColor} color={color} />
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
		taskAction: bindActionCreators(taskAction, dispatch),
		categoryAction: bindActionCreators(categoryAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen)