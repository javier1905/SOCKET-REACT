import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import store from './redux/store'
import Home from './component/home/home'
import Login from './component/login/login'

import './index.css'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/app'>
						<App />
					</Route>
					<Route>
						<Login exact path='/login' />
					</Route>
				</Switch>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
