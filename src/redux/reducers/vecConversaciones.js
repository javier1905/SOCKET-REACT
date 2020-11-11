import { type as ADD_CONVERSACION } from '../action/findVecConversaciones'
import { type as UPDATE_CONVERSACION } from '../action/conversacionUpdate'
import { type as UPDATE_VEC_CONVERSACION } from '../action/updateVecConversaciones'
import { comparaUsuario } from '../../methods/methods'

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
				if (c.usuario.emailUsuario === payload.usuario.emailUsuario) {
					c.idSocketEmisor = payload.idSocketEmisor
					c.mensajeRecibido = payload.mensajeRecibido
					return
				}
			})
			state = [...vec] //TODO: es la forma que actualize ele stado
			return state
		}

		case UPDATE_VEC_CONVERSACION: {
			var vec = payload.vecConversaciones
			var vecConect = payload.vecContactos
			vec.forEach(conversacion => {
				vecConect.forEach(contact => {
					if (comparaUsuario(conversacion.usuario, contact.usuario))
						conversacion.idSocketEmisor = contact.idConexion
				})
			})

			state = [...vec]
			return state
		}

		default:
			return state
	}
}
export default vecConversacion
