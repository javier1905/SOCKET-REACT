import { useState, useEffect } from 'react'
import './contacto.css'

const Contacto = ({ socket, contacto, abrirConvesacion }) => {
	const [ContactO, setContactO] = useState({ idConexion: '', nombreUsuario: '' })

	useEffect(() => {
		setContactO(contacto)
	}, [contacto])

	const openChat = e => {
		abrirConvesacion({
			idSocketEmisor: ContactO.idConexion,
			nombreEmisor: ContactO.nombreUsuario,
			mensajeRecibido: '',
		})
	}

	return (
		<div className='container_contacto'>
			<button onClick={openChat}>{ContactO.nombreUsuario}</button>
		</div>
	)
}

export default Contacto
