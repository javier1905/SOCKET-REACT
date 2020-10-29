import { type as GETCONNECTIONSOCKET } from '../action/findConnectionSocket'

const defaulrState = ''

const SocketConnection = (state = defaulrState, { type, payload }) => {
	switch (type) {
		case GETCONNECTIONSOCKET:
			return payload
		default:
			return state
	}
}

export default SocketConnection
