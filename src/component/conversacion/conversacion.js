import { useState, useEffect, useRef } from 'react'
import './conversacion.css'

const Conversacion = ({ conversacion, position }) => {
	const [conversacioN, setConversacionN] = useState({ idConexion: '', nombreUsuario: '' })

	const divConversacion = useRef()

	useEffect(() => {
		setConversacionN(conversacion)
	}, [conversacion])

	const minimizar = e => {
		divConversacion.current.classList.remove('maximizar')
		divConversacion.current.classList.add('minimizar')
	}

	const maximizar = e => {
		divConversacion.current.classList.remove('minimizar')
		divConversacion.current.classList.add('maxmizar')
	}
	return (
		<div ref={divConversacion} style={{ right: position }} className='container_conversacion'>
			<button onClick={minimizar} className='btn_minimizarr'>
				x
			</button>
			<button onClick={maximizar} className='btn_maximizarr'>
				{'<'}
			</button>
			<h4>{conversacioN.nombreUsuario}</h4>
			<div className='cuerpo_conversacion'></div>
			<input type='text' placeholder='mensaje...' />
		</div>
	)
}

export default Conversacion
