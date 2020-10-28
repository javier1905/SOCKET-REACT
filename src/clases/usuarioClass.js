class Usuario {
	constructor() {
		this.id = ''
		this.nombre = ''
		this.perfil = ''
	}

	set Id(id) {
		this.id = id
	}
	set Nombre(nombre) {
		this.nombre = nombre
	}
	set Perfil(perfil) {
		this.perfil = perfil
	}

	get Id() {
		return this.id
	}
	get Nombre() {
		return this.nombre
	}
	get Perfil() {
		return this.perfil
	}
}

export default Usuario
