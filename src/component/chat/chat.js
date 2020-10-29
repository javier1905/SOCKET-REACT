import { useEffect, useState } from 'react'
import Contactos from '../contactos/contactos'
import Conversaciones from '../conversaciones/conversaciones'
// import findConeccionSocket from '../../redux/action/findConnectionSocket'
// import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

import './chat.css'

const Chat = ({ desconectarChat }) => {
	const [vecContactos, setvecContactos] = useState([])
	const [vecConversaciones, setvecConversaciones] = useState([])
	const [myIdConexion, setmyIdConexion] = useState('')
	const [posicion, setposicion] = useState(250)
	const socket = useSelector(state => state.SocketConnection)
	const nameUser = useSelector(state => state.NombreUsuario)

	useEffect(() => {
		socket.emit('sendUserConected', nameUser)
		socket.on('updateConect', vecConect => {
			setvecContactos(vecConect)
		})

		socket.on('resibirMsj:node-react', datos => {
			if (vecConversaciones.find(c => c.idSocketEmisor === datos.idSocketEmisor) === undefined) {
				setvecConversaciones(vec => [
					...vec,
					{
						idSocketEmisor: datos.idSocketEmisor,
						nombreEmisor: datos.nombreEmisor,
						mensajeRecibido: datos.mensajeRecibido,
					},
				])
			} else {
				//TODO: reemplazar al exitenet para que cambien el mensaje
			}
		})
	}, [])
	useEffect(() => {
		setmyIdConexion(socket.id)
	}, [socket])

	const abrirConvesacion = ({ idSocketEmisor, nombreEmisor, mensajeRecibido }) => {
		vecConversaciones.find(c => c.idSocketEmisor === idSocketEmisor) === undefined &&
			setvecConversaciones(vec => [...vec, { idSocketEmisor, nombreEmisor, mensajeRecibido }])
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
