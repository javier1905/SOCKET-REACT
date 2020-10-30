import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import SocketConnection from './reducers/socketConecction'
import NombreUsuario from './reducers/nombreUsaurio'
import vecConversaciones from './reducers/vecConversaciones'
const misReducers = combineReducers({ SocketConnection, NombreUsuario, vecConversaciones })

export default createStore(
	misReducers,
	composeWithDevTools(applyMiddleware(thunk)), //TODO: permite peticiones asincronas
	window.STATE_FROM_SERVER
)
