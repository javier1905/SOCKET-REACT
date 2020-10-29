import { useState, useEffect, useRef } from 'react'
import './conversacion.css'

const Conversacion = ({ conversacion, position }) => {
	const [conversacioN, setConversacionN] = useState({ idConexion: '', nombreUsuario: '' })

	const divConversacion = useRef()
	const btnMaximizar = useRef()
	const btnMinimizar = useRef()

	useEffect(() => {
		setConversacionN(conversacion)
	}, [conversacion])

	const minimizar = e => {
		btnMinimizar.current.classList.add('esconderBtn')
		btnMaximizar.current.classList.remove('esconderBtn')
		divConversacion.current.classList.remove('maximizar')
		divConversacion.current.classList.add('minimizar')
	}

	const maximizar = e => {
		btnMaximizar.current.classList.add('esconderBtn')
		btnMinimizar.current.classList.remove('esconderBtn')
		divConversacion.current.classList.remove('minimizar')
		divConversacion.current.classList.add('maximizar')
	}
	return (
		<div ref={divConversacion} style={{ right: position }} className='container_conversacion'>
			<button ref={btnMaximizar} onClick={maximizar} className='btn_maximizarr'>
				{'<'}
			</button>
			<button ref={btnMinimizar} onClick={minimizar} className='btn_minimizarr'>
				x
			</button>
			<h4>{conversacioN.nombreUsuario}</h4>
			<div className='cuerpo_conversacion'></div>
			<input type='text' placeholder='mensaje...' />
		</div>
	)
}

export default Conversacion
