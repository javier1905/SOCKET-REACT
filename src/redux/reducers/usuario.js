import { type as SET_USUARIO } from '../action/setUsuario'
const defaultState = { emailUsuario: '', nombreUsaurio: '', apellidoUsuario: '' }

const usuario = (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_USUARIO:
			return payload

		default:
			return state
	}
}

export default usuario
