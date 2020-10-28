import { useState, useEffect } from 'react'
import './conversacion.css'

const Conversacion = ({ conversacion, position }) => {
	const [conversacioN, setConversacionN] = useState({ idConexion: '', nombreUsuario: '' })

	useEffect(() => {
		setConversacionN(conversacion)
	}, [conversacion])
	return (
		<div style={{ right: position }} className='container_conversacion'>
			<h4>{conversacioN.nombreUsuario}</h4>
			<div className='cuerpo_conversacion'></div>
			<input type='text' placeholder='mensaje...' />
		</div>
	)
}

export default Conversacion
