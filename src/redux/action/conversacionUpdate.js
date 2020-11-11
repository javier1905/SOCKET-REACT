export const type = 'CONVERSACION_UPDATE'

const conversacionUpdate = ({ idSocketEmisor, usuario, mensajeRecibido }) => {
	return {
		type,
		payload: { idSocketEmisor, usuario, mensajeRecibido },
	}
}

export default conversacionUpdate
