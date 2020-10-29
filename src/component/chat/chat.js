import { useEffect, useState } from 'react'
import Contactos from '../contactos/contactos'
import Conversaciones from '../conversaciones/conversaciones'
// import findConeccionSocket from '../../redux/action/findConnectionSocket'
// import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import './chat.css'

const Chat = ({ desconectarChat, nameUser }) => {
	const [vecContactos, setvecContactos] = useState([])
	const [vecConversaciones, setvecConversaciones] = useState([])
	const [myIdConexion, setmyIdConexion] = useState('')
	const [posicion, setposicion] = useState(250)
	const socket = useSelector(state => state.SocketConnection)

	useEffect(() => {
		socket.emit('sendUserConected', nameUser)
		socket.on('updateConect', vecConect => {
			setvecContactos(vecConect)
		})

		// socket.on('abrirConver', id => {
		// 	try {
		// 		if (id === socket.id) {
		// 			setvecConversaciones(vec => [vec, { id: id }])
		// 		}
		// 	} catch (error) {}
		// })
	}, [])
	useEffect(() => {
		setmyIdConexion(socket.id)
	}, [socket])

	const abrirConvesacion = contacto => {
		vecConversaciones.find(c => c.idConexion === contacto.idConexion) === undefined &&
			setvecConversaciones(vec => [...vec, contacto])
		setposicion(260)
	}

	const mueveIZquierda = e => posicion < 250 && setposicion(p => p + 250)

	const mueveIDerecha = e => {
		document.querySelector('#container_conversaciones').offsetLeft + 250 < 250 &&
			setposicion(p => p - 250)
	}

	return (
		<div className='App'>
			<div>APP</div>
			<Contactos
				vecContactos={vecContactos.filter(cc => cc.nombreUsuario !== nameUser)}
				abrirConvesacion={abrirConvesacion}
			/>
			<Conversaciones posicion={posicion} vecConversaciones={vecConversaciones} socket={socket} />
			<div className='container_slider'>
				<button onClick={mueveIZquierda}>{'<'}</button>
				<button onClick={mueveIDerecha}>{'>'} </button>
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
