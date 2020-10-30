export const type = 'VEC_CONVERSACIONES'

const setConversacion = ({ idSocketEmisor, nombreEmisor, mensajeRecibido }) => {
	return {
		type,
		payload: { idSocketEmisor, nombreEmisor, mensajeRecibido },
	}
}

export default setConversacion
