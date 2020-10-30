import { type as ADD_CONVERSACION } from '../action/findVecConversaciones'

const defautlState = []

const vecConversacion = (state = defautlState, { type, payload }) => {
	switch (type) {
		case ADD_CONVERSACION: {
			state = [...state, payload]

			return state
		}

		default:
			return state
	}
}
export default vecConversacion
