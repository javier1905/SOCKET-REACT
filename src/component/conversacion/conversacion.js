import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import './conversacion.css'

const Conversacion = ({ idSocketEmisor, nombreEmisor, mensajeRecibido, position }) => {
	const [mensaje, setmensaje] = useState('')
	const [vecChat, setvecChat] = useState([])

	const divConversacion = useRef()
	const btnMaximizar = useRef()
	const btnMinimizar = useRef()
	const socket = useSelector(state => state.SocketConnection)
	const nameUser = useSelector(state => state.NombreUsuario)

	useEffect(() => {
		if (mensajeRecibido === '') {
		} else {
			setvecChat(vec => [...vec, { nombre: nombreEmisor, msj: mensajeRecibido }])
		}
	}, [mensajeRecibido])

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

	const enviarMsj = () => {
		if (mensaje !== '') {
			socket.emit('enviarMsj:react-node', {
				idSocketReceptor: idSocketEmisor,
				nombre: nameUser,
				mensaje: mensaje,
			})
			setvecChat(vec => [...vec, { nombre: nameUser, msj: mensaje }])
			setmensaje('')
		}
	}

	const escribiendo = e => {
		// if (e.target.value)
		// 	socket.emit('escribiendo:react-node', { idSocketReceptor: conversacioN.idConexion })
		setmensaje(e.target.value)
	}

	return (
		<div ref={divConversacion} style={{ right: position }} className='container_conversacion'>
			<button ref={btnMaximizar} onClick={maximizar} className='btn_maximizarr'>
				{'<'}
			</button>
			<button ref={btnMinimizar} onClick={minimizar} className='btn_minimizarr'>
				x
			</button>
			<h4>{nombreEmisor}</h4>
			<div>
				<p> escribiendo....</p>
			</div>
			<div className='cuerpo_conversacion'>
				{vecChat.map((chat, i) => {
					return <div key={i}>{`${chat.nombre}: ${chat.msj}`}</div>
				})}
			</div>
			<input value={mensaje} onChange={escribiendo} type='text' placeholder='mensaje...' />
			<button onClick={enviarMsj}>enviar</button>
		</div>
	)
}

export default Conversacion
