export const type = 'SET_SOCKET'

const setSocket = socket => {
	return {
		type,
		payload: socket,
	}
}

export default setSocket
