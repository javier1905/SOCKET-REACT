import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { comparaUsuario } from '../../methods/methods'

import './conversacion.css'

const Conversacion = ({ idSocketEmisor, usuario, mensajeRecibido, position }) => {
	const [mensaje, setmensaje] = useState('')
	const [vecChat, setvecChat] = useState([])
	const [escribiendoo, setescribiendoo] = useState(false)

	const divConversacion = useRef()
	const container_contac = useRef()
	const divDesconeccion = useRef()
	const svg = useRef()

	const socket = useSelector(state => state.socket)
	const usuari = useSelector(state => state.usuario)

	useEffect(() => {
		socket.on('updateConect', vecConec => {
			var bandera = false
			debugger
			vecConec.forEach(element => {
				if (comparaUsuario(element.usuario, usuario)) {
					bandera = true
					return
				}
			})
			if (divDesconeccion.current !== null) {
				bandera === false
					? (divDesconeccion.current.style.display = 'block')
					: (divDesconeccion.current.style.display = 'none')
			}
		})
		socket.on(
			'escribiendo:node-react',
			datos => datos.usuario.emailUsuario === usuario.emailUsuario && setescribiendoo(datos.es)
		)
	}, [])

	useEffect(() => {
		if (mensajeRecibido === '') {
		} else setvecChat(vec => [...vec, { nombre: usuario.emailUsuario, msj: mensajeRecibido }])
	}, [mensajeRecibido])

	const enviarMsj = () => {
		if (mensaje !== '') {
			socket.emit('enviarMsj:react-node', {
				idSocketReceptor: idSocketEmisor,
				usuario: usuari,
				mensaje: mensaje,
			})
			socket.emit('escribiendo:react-node', { idSocketEmisor, usuario: usuari, es: false })
			setvecChat(vec => [...vec, { nombre: usuari.emailUsuario, msj: mensaje }])
			setmensaje('')
		}
	}

	const enviarMsjENTER = e => e.key === 'Enter' && enviarMsj()

	const escribiendo = e => {
		var es
		e.target.value === '' ? (es = false) : (es = true)
		socket.emit('escribiendo:react-node', { idSocketEmisor, usuario: usuari, es: es })
		setmensaje(e.target.value)
	}

	const toogle = e => {
		container_contac.current.classList.remove('showAnimacionToogleW')
		container_contac.current.classList.remove('hideAnimacionToogleW')
		const btn = svg.current
		if (btn.style.transform === 'rotate(180deg)') {
			btn.style.transform = 'rotate(360deg)'
			container_contac.current.classList.add('showAnimacionToogleW')
		} else if (btn.style.transform === 'rotate(360deg)') {
			container_contac.current.classList.add('hideAnimacionToogleW')
			btn.style.transform = 'rotate(180deg)'
		} else {
			container_contac.current.classList.add('hideAnimacionToogleW')
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
					<div className='circulo_verdeW'> </div>
				</div>
				<p>{usuario && usuario.emailUsuario}</p>
				<div className='container_buttons' ref={svg}>
					<button className='btn_downW' onClick={toogle}>
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
				</div>
			</div>
			<div ref={container_contac} className='container_cuerpoConversacion'>
				<div className='container_escribiendo'>
					<p>{escribiendoo ? `${usuario && usuario.emailUsuario} escribiendo....` : '.'}</p>
				</div>
				<div className='cuerpo_conversacion'>
					{vecChat.map((chat, i) => {
						return <div key={i}>{`${chat.nombre}: ${chat.msj}`}</div>
					})}
				</div>
				<div className='divBloqueadoPorDesconexion'>
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
					<div className='div_desconeccion' ref={divDesconeccion}></div>
				</div>
			</div>
		</div>
	)
}

export default Conversacion
