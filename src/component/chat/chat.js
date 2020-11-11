import { useEffect, useState } from 'react'
import Contactos from '../contactos/contactos'
import Conversaciones from '../conversaciones/conversaciones'
import addConversacion from '../../redux/action/findVecConversaciones'
import updateConversacion from '../../redux/action/conversacionUpdate'
// import findConeccionSocket from '../../redux/action/findConnectionSocket'
// import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { comparaUsuario } from '../../methods/methods'

import './chat.css'
import setConversacion from '../../redux/action/findVecConversaciones'

const Chat = ({ desconectarChat }) => {
	const [vecContactos, setvecContactos] = useState([])
	const [newConversacion, setnewConversacion] = useState({
		idSocketEmisor: '',
		usuario: { emailUsuario: '', nombreUsuario: '', apellidoUsuario: '' },
		mensajeRecibido: '',
	})
	const [posicion, setposicion] = useState(250)

	const socket = useSelector(state => state.socket)
	const usuario = useSelector(state => state.usuario)
	var vecConversaciones = useSelector(state => state.vecConversaciones)
	const dispatch = useDispatch()

	useEffect(() => {
		socket.emit('sendUserConected', usuario)

		socket.on('updateConect', vecConect => {
			var vec = vecConversaciones
			debugger
			vec.forEach(conversacion => {
				vecConect.forEach(contact => {
					if (comparaUsuario(conversacion.usuario, contact.usuario))
						conversacion.idSocketEmisor = contact.idConexion
				})
			})
			dispatch(setConversacion)
			setvecContactos(vecConect)
		})

		socket.on('resibirMsj:node-react', datos => {
			setnewConversacion({
				idSocketEmisor: datos.idSocketEmisor,
				usuario: datos.usuario,
				mensajeRecibido: datos.mensajeRecibido,
			})
		})

		socket.on('connect_error', error => {
			console.log('====================================')
			console.log(error)
			console.log('====================================')
		})
	}, [])

	useEffect(() => {
		if (
			vecConversaciones.find(c => comparaUsuario(c.usuario, newConversacion.usuario)) === undefined
		) {
			newConversacion.idSocketEmisor !== '' && dispatch(addConversacion(newConversacion))
		} else {
			newConversacion.idSocketEmisor !== '' && dispatch(updateConversacion(newConversacion))
		}
	}, [newConversacion])

	const abrirConvesacion = ({ idSocketEmisor, usuario, mensajeRecibido }) => {
		setposicion(260)
		vecConversaciones.find(c => comparaUsuario(c.usuario, usuario)) === undefined &&
			dispatch(
				addConversacion({
					idSocketEmisor: idSocketEmisor,
					usuario: usuario,
					mensajeRecibido: mensajeRecibido,
				})
			)
	}

	const mueveIZquierda = e => posicion < 250 && setposicion(p => p + 250)

	const mueveIDerecha = e => {
		document.querySelector('#container_conversaciones').offsetLeft + 250 < 250 &&
			setposicion(p => p - 250)
	}

	return (
		<div className='App'>
			<div>
				<h1>{usuario.email}</h1>
			</div>
			<Contactos
				vecContactos={vecContactos.filter(cc => cc.usuario.emailUsuario !== usuario.emailUsuario)}
				abrirConvesacion={abrirConvesacion}
			/>
			<Conversaciones posicion={posicion} />
			<div className='container_slider'>
				<button onClick={mueveIZquierda}>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<button onClick={mueveIDerecha}>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			</div>
			<button
				onClick={e => {
					socket.disconnect()
					desconectarChat()
				}}
			>
				DESCONECTAR DEL CHAT
			</button>
		</div>
	)
}

export default Chat

//TODO: REDUX USANDO HOC => -----------------

// export default connect(
// 	store => {
// 		socket: store
// 	},
// 	{
// 		setConecctionSocket: findConeccionSocket,
// 	}
// )(Chat)
