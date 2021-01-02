import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import TaskScreen from './component/task/task-screen';
import TaskForm from './component/task/task-form';
import CategoryScreen from './component/category/category-screen';
import CategoryForm from './component/category/category-form'


const MainNavigator = createStackNavigator(
    {
        TaskScreen: { screen: TaskScreen},
		TaskForm: { screen: TaskForm },
        CategoryScreen: { screen: CategoryScreen },
		CategoryForm: { screen: CategoryForm }
    },
    {
        initialRouteName: 'CategoryScreen',
        headerMode: 'none',
    },
)

const router = createAppContainer(MainNavigator)

export default router;


