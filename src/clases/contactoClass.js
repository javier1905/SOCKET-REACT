import Usuario from './usuarioClass'

class Contacto {
	constructor() {
		this.idConexion = ''
		this.usuario = new Usuario()
	}

	set IdConexion(idConexion) {
		this.idConexion = idConexion
	}

	set Usuario(usuario) {
		this.usuario = usuario
	}

	get IdConexion() {
		return this.IdConexion
	}

	get Usuario() {
		return this.usuario
	}
}

export default Contacto
