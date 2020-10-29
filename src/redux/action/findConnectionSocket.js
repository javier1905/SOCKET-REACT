export const type = 'CONNECTION_SOCKET'

const SetConexionSocket = socket => {
	return {
		type,
		payload: socket,
	}
}

export default SetConexionSocket
