import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './conversacion.css'

const Conversacion = ({ idSocketEmisor, nombreEmisor, mensajeRecibido, position }) => {
	const [mensaje, setmensaje] = useState('')
	const [vecChat, setvecChat] = useState([])

	const divConversacion = useRef()
	const container_contac = useRef()
	const divDesconeccion = useRef()
	const svg = useRef()

	const socket = useSelector(state => state.SocketConnection)
	const nameUser = useSelector(state => state.NombreUsuario)

	useEffect(() => {
		socket.on('updateConect', vecConec => {
			var bandera = false

			vecConec.forEach(element => {
				if (element.idConexion === idSocketEmisor && element.nombreUsuario === nombreEmisor) {
					bandera = true
					return
				}
			})

			if (bandera === false) {
				divDesconeccion.current.style.display = 'block'
			} else {
				divDesconeccion.current.style.display = 'none'
			}
		})
	}, [])

	useEffect(() => {
		if (mensajeRecibido === '') {
		} else {
			setvecChat(vec => [...vec, { nombre: nombreEmisor, msj: mensajeRecibido }])
		}
	}, [mensajeRecibido])

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

	const enviarMsjENTER = e => e.key === 'Enter' && enviarMsj()

	const escribiendo = e => {
		// if (e.target.value)
		// 	socket.emit('escribiendo:react-node', { idSocketReceptor: conversacioN.idConexion })
		setmensaje(e.target.value)
	}

	const toogle = e => {
		container_contac.current.classList.remove('showAnimacionToogle')
		container_contac.current.classList.remove('hideAnimacionToogle')
		const btn = svg.current
		if (btn.style.transform === 'rotate(180deg)') {
			btn.style.transform = 'rotate(360deg)'
			container_contac.current.classList.add('showAnimacionToogle')
		} else if (btn.style.transform === 'rotate(360deg)') {
			container_contac.current.classList.add('hideAnimacionToogle')
			btn.style.transform = 'rotate(180deg)'
		} else {
			container_contac.current.classList.add('hideAnimacionToogle')
			btn.style.transform = 'rotate(180deg)'
		}
	}

	return (
		<div ref={divConversacion} style={{ right: position }} className='container_conversacion'>
			<div className='container_nombreConversacion'>
				<div className='container_imgContac'>
					<img
						src={'https://i.pinimg.com/474x/ed/7a/b1/ed7ab14dabada7f024e2a21640b02290.jpg'}
						alt='foto'
					></img>
					<div className='circulo_verde'> </div>
				</div>
				<p>{nombreEmisor}</p>
				<div className='container_buttons' ref={svg}>
					<button className='btn_down' onClick={toogle}>
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
				</div>
			</div>
			<div ref={container_contac} className='container_cuerpoConversacion'>
				<div className='container_escribiendo'>
					<p> escribiendo....</p>
				</div>
				<div className='cuerpo_conversacion'>
					{vecChat.map((chat, i) => {
						return <div key={i}>{`${chat.nombre}: ${chat.msj}`}</div>
					})}
				</div>
				<textarea
					onKeyUp={enviarMsjENTER}
					value={mensaje}
					onChange={escribiendo}
					type='text'
					placeholder='mensaje...'
				/>
				<div className='container_btn_enviar'>
					<button onClick={enviarMsj}>enviar</button>
				</div>
			</div>
			<div className='div_desconeccion' ref={divDesconeccion}>
				<button>
					<FontAwesomeIcon icon={faTimesCircle} />
				</button>
			</div>
		</div>
	)
}

export default Conversacion
