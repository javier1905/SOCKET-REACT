export const type = 'SET_USUARIO'

const setUsuario = usuario => {
	return {
		type,
		payload: usuario,
	}
}

export default setUsuario
