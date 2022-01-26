import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TaskScreen from './component/task/task-screen'
import CategoryScreen from './component/category/category-screen'

const Stack = createStackNavigator()

function router() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Category' screenOptions={{ headerShown: false }}>
				<Stack.Screen name='Category' component={CategoryScreen} />
				<Stack.Screen name='Task' component={TaskScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default router


