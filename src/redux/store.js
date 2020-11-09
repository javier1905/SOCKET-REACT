import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import socket from './reducers/socket'
import usuario from './reducers/usuario'
import vecConversaciones from './reducers/vecConversaciones'
const misReducers = combineReducers({ socket, usuario, vecConversaciones })

export default createStore(
	misReducers,
	composeWithDevTools(applyMiddleware(thunk)), //TODO: permite peticiones asincronas
	window.STATE_FROM_SERVER
)
