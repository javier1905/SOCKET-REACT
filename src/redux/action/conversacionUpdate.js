export const type = 'CONVERSACION_UPDATE'

const conversacionUpdate = ({ idSocketEmisor, nombreEmisor, mensajeRecibido }) => {
	return {
		type,
		payload: { idSocketEmisor, nombreEmisor, mensajeRecibido },
	}
}

export default conversacionUpdate
