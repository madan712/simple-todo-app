import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import TaskScreen from './task-screen';
import CategoryScreen from './category-screen';


const MainNavigator = createStackNavigator(
    {
        TaskScreen: { screen: TaskScreen},
        CategoryScreen: { screen: CategoryScreen },
    },
    {
        initialRouteName: 'TaskScreen',
        headerMode: 'none',
    },
)

const App = createAppContainer(MainNavigator)

export default App;


