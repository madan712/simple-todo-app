import * as React from 'react'

import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'

import { initApp } from './src/db'
import appStore from './src/app-store'
import Router from './src/router'

export default function App() {

	React.useEffect(() => {
		console.log('Creating DB')
		initApp(() => void 0)
	}, [])

	return (
		<StoreProvider store={appStore}>
			<PaperProvider>
				<Router />
			</PaperProvider>
		</StoreProvider>
	)
}