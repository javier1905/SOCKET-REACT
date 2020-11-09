import { type as SET_SOCKET } from '../action/setSocket'

const defaulrState = ''

const SocketConnection = (state = defaulrState, { type, payload }) => {
	switch (type) {
		case SET_SOCKET:
			return payload
		default:
			return state
	}
}

export default SocketConnection
