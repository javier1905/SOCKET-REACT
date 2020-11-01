import { type as ADD_CONVERSACION } from '../action/findVecConversaciones'
import { type as UPDATE_CONVERSACION } from '../action/conversacionUpdate'

const defautlState = []

const vecConversacion = (state = defautlState, { type, payload }) => {
	switch (type) {
		case ADD_CONVERSACION: {
			state = [...state, payload]
			return state
		}
		case UPDATE_CONVERSACION: {
			var vec = state
			vec.forEach(c => {
				if (
					c.idSocketEmisor === payload.idSocketEmisor &&
					c.nombreEmisor === payload.nombreEmisor
				) {
					c.mensajeRecibido = payload.mensajeRecibido
					return
				}
			})
			state = [...vec] //TODO: es la forma que actualize ele stado
			return state
		}

		default:
			return state
	}
}
export default vecConversacion
