import usuario from '../redux/reducers/usuario'

export const comparaUsuario = (usuario1, usuario2) => {
	try {
		if (usuario1 === undefined) return false
		else if (usuario2 === undefined) return false
		else if (usuario1.emailUsuario === undefined) return false
		else if (usuario2.emailUsuario === undefined) return false
		else if (usuario1.emailUsuario === usuario2.emailUsuario) return true
	} catch (error) {
		return false
	}
}

export default {}
