export const type = 'NOMBRE_USUARIO'

const SetNombreUsuario = nombreUsuario => {
	return {
		type,
		payload: nombreUsuario,
	}
}

export default SetNombreUsuario
