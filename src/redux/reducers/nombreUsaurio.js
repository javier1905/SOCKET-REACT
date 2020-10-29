import { type as NOMBRE_USUARIO } from '../action/findNombreUsuario'
const defaulrState = ''

const nombreUsaurio = (state = defaulrState, { type, payload }) => {
	switch (type) {
		case NOMBRE_USUARIO:
			return payload
			break

		default:
			return state
	}
}

export default nombreUsaurio
