import React, { Component } from 'react';
import { Provider } from 'react-redux';

import appStore from './src/app-store';
import Router from './src/router';

import { initApp } from './src/db';

class App extends Component {
	
	componentDidMount() {
		initApp(() => void 0);
	}
        
	render() {		
		return ( 
			<Provider store={appStore}>
				<Router />
			</Provider>
		);
	}
}

export default App;
