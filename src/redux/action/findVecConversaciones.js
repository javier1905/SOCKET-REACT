export const type = 'VEC_CONVERSACIONES'

const setConversacion = ({ idSocketEmisor, usuario, mensajeRecibido }) => {
	return {
		type,
		payload: { idSocketEmisor, usuario, mensajeRecibido },
	}
}

export default setConversacion
