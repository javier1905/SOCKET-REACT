import { useState, useEffect } from 'react'
import './contacto.css'

const Contacto = ({ socket, contacto, abrirConvesacion }) => {
	const [ContactO, setContactO] = useState({ idConexion: '', nombreUsuario: '' })

	useEffect(() => {
		setContactO(contacto)
	}, [contacto])

	const openChat = e => {
		// socket.emit('abrirConversacion', {
		// 	idConexion: contacto.id,
		// 	nombreUsuario: contacto.nombreUsuario,
		// })
		abrirConvesacion(ContactO)
		console.log('ando')
	}

	return (
		<div className='container_contacto'>
			<button onClick={openChat}>{ContactO.nombreUsuario}</button>
		</div>
	)
}

export default Contacto
